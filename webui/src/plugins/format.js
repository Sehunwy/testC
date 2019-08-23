/**
 * 时间格式化
 */
export const formatDateTime = (date, fmt) => {
    if (!date) {
        return "";
    }
    if (typeof date === 'string') {
        date = new Date(date);
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        let str = o[k] + '';
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

/**
 * 拜访天数格式化
 */
export const formatVisitDays = (visitTime) => {
    if (!visitTime) return "暂无拜访信息";
    if (typeof visitTime === 'string') {
        visitTime = new Date(visitTime);
    }
    let currentDate = new Date();
    let timeDiff = Math.abs(currentDate.getTime() - visitTime.getTime());
    let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (diffDays > 99) {
        diffDays = 99;
    }
    if (diffDays === 0) {
        return "今日已拜访";
    }
    if (diffDays === 1) {
        return "昨日已拜访";
    }
    return diffDays + "天未拜访";
}


/**
 * 拜访状态格式化
 */
export const formatVisitState = (isVisiting) => {
    if (isVisiting) {
        return "拜访中";
    }
    return "已完成";
}

/**
 * 拜访时间(停留时间or开始时间)格式化
 */
export const formatVisitTime = (beginTime, finishTime) => {
    if (!beginTime) {
        return "--";
    }
    if (!finishTime) {
        return formatDateTime(beginTime, 'hh:mm:ss')
    }
    beginTime = new Date(beginTime);
    finishTime = new Date(finishTime);
    let mss = Math.abs(beginTime.getTime() - finishTime.getTime());
    let hours = Math.floor(mss / (1000 * 60 * 60));
    let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
    return hours + "小时" + minutes + "分钟";
}

/**
 * 拜访停留时间格式化
 */
export const formatVisitDuration = (beginTime, finishTime) => {
    if (!beginTime || !finishTime) {
        return "--";
    }
    beginTime = new Date(beginTime);
    finishTime = new Date(finishTime);
    let mss = Math.abs(beginTime.getTime() - finishTime.getTime());
    let hours = Math.floor(mss / (1000 * 60 * 60));
    let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
    return hours + "小时" + minutes + "分钟";
}

/**
 * 拜访日期格式化
 */
export const formatVisitDate = (visitDate) => {
    if (!visitDate) {
        return "--";
    }
    visitDate = new Date(visitDate);
    let currentDate = new Date();
    if (dateEquals(visitDate, currentDate)) {
        return "今天";
    }
    let preDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
    if (dateEquals(visitDate, preDate)) {
        return "昨天";
    }
    return formatDateTime(visitDate, 'yyyy-MM-dd');
}

/**
 * 拜访日期颜色格式化
 */
export const formatVisitDateColor = (formatVisitDate) => {
    if (!formatVisitDate || formatVisitDate === "--") {
        return "#b2b2b2";
    }
    if (formatVisitDate === "今天") {
        return "#ED340D";
    }
    if (formatVisitDate === "昨天") {
        return "#F68A1E";
    }
    return "#b2b2b2";
}

/**
 * 事项等级格式化
 */
export const formatItemLevel = (level) => {
    if (!level) {
        return "未知";
    }
    if (level == 1) {
        return "一般";
    }
    if (level == 2) {
        return "高";
    }
    return "未知";
}

/**
 * 事项状态格式化
 */
export const formatItemState = (state) => {
    if (!state) {
        return "未知";
    }
    if (state == 1) {
        return "新建";
    }
    if (state == 2) {
        return "处理中";
    }
    if (state == 3) {
        return "已结束";
    }
    return "未知";
}

/**
 * 事项状态颜色格式化
 */
export const formatItemStateColor = (state) => {
    if (!state) {
        return "#b2b2b2";
    }
    if (state == 1) {
        return "#3fcc8e";
    }
    if (state == 2) {
        return "#47EA1B";
    }
    if (state == 3) {
        return "#b2b2b2";
    }
    return "#b2b2b2";
}

export const dateEquals = (perDate, nextDate) => {
    if (perDate.getFullYear() === nextDate.getFullYear() && perDate.getMonth() === nextDate.getMonth() && perDate.getDate() === nextDate.getDate()) {
        return true;
    }
    return false;
}

/**
 * 距离格式化
 */
export const formatDistance = (distance) => {
    if (distance === "" || distance === null || distance === undefined || distance === -1) {
        return "--m";
    }
    if (typeof distance !== 'number') {
        distance = parseFloat(distance)
    }
    if (distance < 1000) {
        return distance.toFixed(0) + ' m';
    } else {
        let distance_km = (distance / 1000).toFixed(1);
        return distance_km + ' km';
    }
}

/**
 * 客户等级格式化
 */
export const formatCustomerLevel = (level) => {
    if (!level) {
        return "--";
    }
    return level;
}

/**
 * 是否在职格式化
 */
export const formatIncumbent = (incumbent) => {
    if (incumbent) {
        return "在职";
    }
    return "离职";
}


export const format = {
    formatDateTime,
    formatVisitDays,
    formatDistance,
    formatCustomerLevel,
    formatIncumbent,
    formatVisitState,
    formatVisitTime,
    formatVisitDuration,
    formatVisitDate,
    dateEquals,
    formatVisitDateColor,
    formatItemLevel,
    formatItemState,
    formatItemStateColor
}

export default format;