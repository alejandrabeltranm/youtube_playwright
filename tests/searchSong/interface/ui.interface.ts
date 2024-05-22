import { Page } from '@playwright/test';
import { getRandomIndex } from '../data/song.data';

export interface ISelectSongPage {
    goto(): Promise<void>;
    enterSong(song: string): Promise<void>;
    searchSong(): Promise<void>;
    selectRandomResult(): Promise<void>;
    select(song: string): Promise<void>;
}

export class SelectSongPage implements ISelectSongPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.youtube.com/');
        await this.page.waitForSelector('input#search');
    }

    async enterSong(song: string): Promise<void> {
        await this.page.click('//*[@placeholder="Search"]');
        await this.page.fill('//*[@placeholder="Search"]', song);
    }

    async searchSong(): Promise<void> {
        await this.page.click('//*[@id="search-icon-legacy"]');
        await this.page.waitForSelector('ytd-video-renderer', { timeout: 10000 });
    }

    async selectRandomResult(): Promise<void> {
        try {
            const videoElements = await this.page.$$('//*[@id="contents"]/ytd-video-renderer');
            if (videoElements.length > 0) {
                const randomIndex = getRandomIndex(videoElements.length);
                await videoElements[randomIndex].click();
            } else {
                throw new Error('No video results');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async select(song: string): Promise<void> {
        await this.enterSong(song);
        await this.searchSong();
        await this.selectRandomResult();
    }
}