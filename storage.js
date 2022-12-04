class Storage {
    constructor(key, taskComp) {
    this.key = key;
    this.taskComp = taskComp;
    this.createStorage();
    }
    
    createStorage(){
        if (!localStorage.getItem(this.key)) {
            localStorage.setItem(this.key, JSON.stringify([]));
        }
    }
    parseStorage() {
        return JSON.parse(localStorage.getItem(this.key)).map((i) =>
        this.taskComp(i),
        );
    }
    saveStorage(storage) {
        localStorage.setItem(this.key, JSON.stringify(storage));
    }
    getItemIfExists(id, current) {
        const index = current.findIndex((item) => item.id === id);
        if (index !== -1) {
        return [current[index], index];
        }
        return null;
    }
    


    // CRUD
    createItem(item) {
        const current = this.parseStorage();
        current.push(item);
        this.saveStorage(current);
    }
    readItems() {
        return this.parseStorage();
    }
    updateItem(id, updateFunc) {
        const current = this.parseStorage();
        const item = this.getItemIfExists(id, current);
        if (!!item) {
            const [currentItem, index] = item;
            current[index] = updateFunc(currentItem);
            this.saveStorage(current);
        }
    }
    deleteItem(id) {
        const current = this.parseStorage();
        const item = this.getItemIfExists(id, current);
        if (!!item) {
            const [_, index] = item;
            current.splice(index, 1);
            this.saveStorage(current);
        }
    }
} 