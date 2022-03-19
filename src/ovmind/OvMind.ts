import { Oveep } from "oveep/Oveep";
import { OveepConfigsInit } from "oveep_config";
import { Queen } from "queen/Queen";
import { Union } from "union/Union";

export class OvMind {
    private static Instance: OvMind = new OvMind();
    public static getInstance() {return OvMind.Instance;}

    union = new Union();
    queen = new Queen();
    inited = false;

    init() {
        OveepConfigsInit();

        if (!Memory.requested) Memory.requested = {};
        if (!Memory.tasked) Memory.tasked = {};
        if (!Memory.taskIds) Memory.taskIds = {};
        if (!Memory.tasks) Memory.tasks = {};
        this.queen.init();
        this.union.init();

        this.inited = true;
        console.log('Init Success');
    }
    getOveep(name: string):Oveep {
        return this.queen.getOveep(name);
    }

    run() {
        this.union.run();
        this.queen.run();
    }
}
