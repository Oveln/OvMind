interface CreepMemory {
    role: string;
    task: ProtoTask | null;
}

interface Memory {
    tasks: {[kind: string]:ProtoTask[]}
    taskIds: {[id: string]: boolean};
    tasked: {[id: Id<any>]: string[]};
    requested: {[role: string]: number};
}

interface OveepConfig {
    body: BodyPartConstant[];
    amount: number;
}

interface ProtoTask {
    id: string;
    name: string;
    oveepName: string;
    _target: ProtoTarget;
    _next: ProtoTask | null;
    // option: TaskOption;
    data: TaskData;
    outtime: number;
}

interface ProtoTarget {
    id: Id<any>;
    pos: ProtoPos;
}

interface ProtoPos {
    x: number;
    y: number;
    roomName: string;
}

interface TaskData {
    amount?: number;
    resourceType?: ResourceConstant;
}

interface TaskSetting {
    range: number;
    oneshot: boolean;
}

interface SpawnMessage {
    role: string
    pos?: ProtoPos
}
