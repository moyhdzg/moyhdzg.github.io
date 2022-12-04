class taskStorage {
    constructor(id, task, desc) {
        this.id = id;
        this.task = task;   
        this.desc = desc;
    }
    static fromObject(data) {
        return new taskStorage(
        data['id'],
        data['task'],
        data['desc'],
        );
    }
    getId() {
        return this.id;
    }
    getTask() {
        return this.task;
    }
    getDesc() {
        return this.desc;
    }
    toString() {
        return JSON.stringify({
        id: this.id,
        task: this.task,
        desc: this.desc,
        });
    }
}
