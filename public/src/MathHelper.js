/**
 * Created by Trent on 4/24/2017.
 */

'use strict';

const MathHelper = class MathHelper {
    static radiansBetweenAngles(angleFrom, angleTo) {
        if (angleTo < angleFrom) {
            if (angleFrom - angleTo > Math.PI) {
                return Math.PI * 2 - (angleFrom - angleTo);
            } else {
                return -(angleFrom - angleTo);
            }
        } else {
            if (angleTo - angleFrom > Math.PI) {
                return -(Math.PI * 2 - (angleTo - angleFrom));
            } else {
                return angleTo - angleFrom;
            }
        }
    }

    static nearestPointOnLineSegment(line, point) {
        let length2 = MathHelper._lengthSquared(line);
        if (length2 === 0) {
            return [line[0][0], line[0][1]];
        }

        let t = ((point[0] - line[0][0]) * (line[1][0] - line[0][0]) + (point[1] - line[0][1]) * (line[1][1] - line[0][1])) / length2;
        if (t < 0) {
            return [line[0][0], line[0][1]];
        }
        if (t > 1) {
            return [line[1][0], line[1][1]];
        }

        return [line[0][0] + t * (line[1][0] - line[0][0]), line[0][1] + t * (line[1][1] - line[0][1])];
    }

    static distanceSquaredToLineSegment(line, point) {
        let nearestPoint = MathHelper.nearestPointOnLineSegment(line, point);

        return MathHelper._lengthSquared([point, nearestPoint]);
    }

    static distanceSquaredToPoint(pointA, pointB) {
        return MathHelper._lengthSquared([pointA, pointB]);
    }

    static _lengthSquared(line) {
        let dx = line[1][0] - line[0][0];
        let dy = line[1][1] - line[0][1];

        return dx * dx + dy * dy;
    }
};

MathHelper.EPSILON = 0.000001;