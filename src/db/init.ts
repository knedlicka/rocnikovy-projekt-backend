import Task from './models/Task';

Task.sync({ force: true, logging: console.log }).then(() => {
    console.log("synced");
});
