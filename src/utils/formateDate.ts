export const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("sv-SE", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};