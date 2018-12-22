
var schedule = require('node-schedule');

var scheduleJobMap =  new Map();
export const addSchedule = function addSchedule(id, sec){
    if(scheduleJobMap.has(id)){
        return;
    }

      var job = schedule.scheduleJob(`${sec} * * * * *`, function(){
            console.log(`The answer to life, the universe, and everything! id = ${id} sec =  ${sec}`);
        });
    scheduleJobMap.set(id, job);
}

export const removeSchedule = function removeSchedule(id){
    var job = scheduleJobMap.get(id);
    if(job) {
        console.log(job);
        job.cancel();
        scheduleJobMap.delete(id);
    }
}

export const clearAllSchedule = function clearAllSchedule(){
    scheduleJobMap.forEach(function(value, key) {
        console.log(value);
        value.cancel();
    });
    scheduleJobMap.clear();
}
