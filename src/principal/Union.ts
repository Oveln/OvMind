import { Oveep } from "oveep/Oveep";
import { OvMind } from "ovmind/OvMind";
import { InitTask } from "task/InitTask";
import { Task } from "task/Task";
import { Principal } from "./Principal";
import { P_Source } from "./principals/P_Source";
import { P_Spawn } from "./principals/P_Spawn";

export class Union {
    principals: Principal[] = [];
    //任务队列
    get tasks():{[kind: string]:ProtoTask[]} {
        return Memory.tasks;
    }
    //如果为true，则该id的任务存在有效，如果为空，则作废
    get taskIds():{[id: string]: boolean} {
        return Memory.taskIds;
    }

    init() {
        _.forEach(Game.flags,(flag)=>{
            if (flag.color == COLOR_YELLOW) {
                let source = flag.pos.lookFor(LOOK_SOURCES)
                if (source) this.principals.push(new P_Source(source[0].id));
            }
        })
        _.forEach(Game.spawns,(spawn)=>{
            this.principals.push(new P_Spawn(spawn.id));
        })
        console.log('Union Init Success Has',this.principals.length,'Principals');
    }
    //通过prototask添加一个任务
    AddTask(protoTask: ProtoTask) {
        if (!this.tasks[protoTask.name]) this.tasks[protoTask.name] = [];
        this.tasks[protoTask.name].push(protoTask);
        this.taskIds[protoTask.id] = true;
        console.log('add task',protoTask.id);
        // if (!this.tasks[protoTask.name]) this.tasks[protoTask.name] = [];
        // let task = InitTask(protoTask);
        // if (task) {
        //     this.tasks[protoTask.name].push(task);
        //     this.taskIds[protoTask.id] = true;
        // } else console.log('见鬼了');
    }
    //获取某种类型的任务
    getTask(kind: string): Task | null {
        return InitTask(this.tasks[kind][0]);
        // return this.tasks[kind][0];
    }
    //注册某个类型的任务
    RegisterTask(oveep: Oveep, kind: string):boolean {
        let task = InitTask(this.tasks[kind][0]);
        if(!task) return false;
        task.oveep = oveep;
        oveep.task = task;
        this.tasks[kind].splice(0,1);
        return true;
        // let task = this.tasks[kind][0];
        // task.oveep = oveep;
        // oveep.task = task;
        // this.tasks[kind].splice(0,1);
    }
    //通过任务id删除一个任务
    DelTask(id: string) {
        delete this.taskIds[id];
    }
    //查询一个任务是否已经被删除
    queryTask(id: string):boolean {
        return !this.taskIds[id];
    }
    //检查队列中是否有多余的（已被删除的）任务
    checkTask() {
        _.forEach(this.tasks,(taskqueue)=>{
            for (let i = 0;i<taskqueue.length;i++) {
                if (this.queryTask(taskqueue[i].id)) {
                    taskqueue.splice(i,1);
                    i--;
                }
            }
        })
    }
    run() {
        _.forEach(this.tasks,(taskqueue,kind)=>{
            if (taskqueue.length != 0) OvMind.getInstance().queen.Request({role:'miner'});
        })
        this.checkTask();
        _.forEach(this.principals,(principal)=>{
            principal.run();
        })
    }
}
