// Generated locally, no recording or network stream. Xorshift32 white noise.
class DieselNoise extends AudioWorkletProcessor {
 constructor(){super();this.seed=0x6d2b79f5;}
 process(inputs,outputs){const channel=outputs[0]?.[0];if(channel)for(let i=0;i<channel.length;i++){let s=this.seed;s^=s<<13;s^=s>>>17;s^=s<<5;this.seed=s;channel[i]=(s>>>0)/2147483648-1;}return true;}
}
registerProcessor('krate-diesel-noise',DieselNoise);
