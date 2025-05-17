
class StatPoint {
        constructor(gameModeOption, problem, time) {
        }

        ProblemPerSec() {
                return 1/time;
        }

}
class Stats {
        pointList = [];

        // getters
        get pointList() {
                return this.pointList;

        }


        // setters

        constructor() {

        }

        addPoint(point) {
                pointList.push(point);
        }

        mean() {
        }

        toJson() {
        }

        fromJson() {
        }

}
