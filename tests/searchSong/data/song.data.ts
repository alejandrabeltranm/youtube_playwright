export const songs = [
    { title: 'Save Your Tears' },
    { title: 'The Hills' },
    { title: 'I Wanna Be Yours' }
];

export function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

export function getRandomSong() {
    const randomIndex = getRandomIndex(songs.length);
    return songs[randomIndex].title;
}