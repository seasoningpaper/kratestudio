type Choice = 'retry' | 'cancel' | 'discard';
type CloseOptions = {save: () => Promise<boolean>; choose: () => Promise<Choice>};

/** Merge duplicate close/reload requests into one bounded save decision. */
export class CloseGuard {
    private pending?: Promise<boolean>;
    constructor(privateOptions: CloseOptions) { this.options = privateOptions; }
    private readonly options: CloseOptions;
    request(): Promise<boolean> {
        if (this.pending) return this.pending;
        this.pending = this.decide().finally(() => { this.pending = undefined; });
        return this.pending;
    }
    private async decide(): Promise<boolean> {
        for (let attempt = 0; attempt < 2; attempt++) {
            let saved = false;
            try { saved = await this.options.save(); } catch { /* explicit choice below */ }
            if (saved) return true;
            const choice = await this.options.choose();
            if (choice === 'discard') return true;
            if (choice !== 'retry') return false;
        }
        return false; // another explicit user request may start a new attempt
    }
}

/** A stale or unrelated IPC acknowledgement can never authorize closing. */
export class SaveHandshake {
    private pending?: {id: string; finish: (saved: boolean) => void};
    constructor(privateOptions: {send:(id:string)=>void; timeoutMs?:number; id:()=>string}) { this.options = privateOptions; }
    private readonly options: {send:(id:string)=>void; timeoutMs?:number; id:()=>string};
    request(): Promise<boolean> {
        if (this.pending) return Promise.resolve(false);
        return new Promise(resolve => {
            const id = this.options.id();
            const finish = (saved: boolean) => { clearTimeout(timer); this.pending = undefined; resolve(saved); };
            const timer = setTimeout(() => finish(false), this.options.timeoutMs ?? 10000);
            this.pending = {id, finish};
            try { this.options.send(id); } catch { finish(false); }
        });
    }
    acknowledge(id: unknown, saved: unknown): boolean {
        if (typeof id !== 'string' || typeof saved !== 'boolean' || id !== this.pending?.id) return false;
        this.pending.finish(saved);
        return true;
    }
}
