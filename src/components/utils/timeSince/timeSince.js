const timeSince = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const nowDate = new Date();

    const diffMs = nowDate - createdAtDate;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
        return `${diffYears === 1 ? 'một' : diffYears} năm trước`;
    } else if (diffMonths > 0) {
        return `${diffMonths === 1 ? 'một' : diffMonths} tháng trước`;
    } else if (diffDays > 0) {
        return `${diffDays === 1 ? 'một' : diffDays} ngày trước`;
    } else if (diffHours > 0) {
        return `${diffHours === 1 ? 'một' : diffHours} giờ trước`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes === 1 ? 'một' : diffMinutes} phút trước`;
    }
    return 'vài giây trước';
};

export default timeSince;
