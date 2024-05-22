import { test, expect } from '@playwright/test';
import { SelectSongPage } from './ui.interface';
import { getRandomSong, songs } from '../data/song.data';

test('Select random song', async ({ page }) => {
    const selectSongPage = new SelectSongPage(page);
    await selectSongPage.goto();

    const randomSong = getRandomSong();
    await selectSongPage.select(randomSong);

    const videoTitleSelector = '//*[@id="title"]/h1/yt-formatted-string';
    await page.waitForSelector(videoTitleSelector);
    const videoTitle = await page.textContent(videoTitleSelector);

    expect(videoTitle?.toLowerCase()).toContain(randomSong.toLowerCase());
});