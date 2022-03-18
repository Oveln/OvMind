import { Oveep } from "oveep/Oveep";

export class Fucker extends Oveep {
    static Name = 'fucker';
    getTask(): void {
        this.creep.say('fuck!fuck!');
    }
}
