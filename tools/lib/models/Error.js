/**
 * Created by ianpfeffer on 9/22/15.
 */
function Error(msg, object) {
    this.message = msg;
    this.err = object;
}

module.exports = Error;