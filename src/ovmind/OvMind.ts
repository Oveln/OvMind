import { Oveep } from "oveep/Oveep";
import { Oveeps } from "oveep/Oveeps";
import { Union } from "principal/Union";
import { Queen } from "queen/Queen";

export class OvMind {
    private static Instance: OvMind = new OvMind();
    public static getInstance() {return OvMind.Instance;}

    people = new Oveeps();
    union = new Union();
    queen = new Queen();
    inited = false;

    init() {
        Memory.tasked = {};
        Memory.taskIds = {};
        Memory.tasks = {};
        this.queen.init();
        this.people.init();
        this.union.init();

        this.inited = true;
        console.log('Init Success');
    }
    getOveep(name: string):Oveep {
        return this.people.get(name);
    }

    run() {
        this.union.run();
        this.people.run();
        this.queen.run();
    }
}
