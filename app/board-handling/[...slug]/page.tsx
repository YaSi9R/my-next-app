import { createCategoryPageHandler, createStaticParamsGenerator } from '@/lib/utils/category-page-handler';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

export const generateStaticParams = createStaticParamsGenerator('board-handling');

const BoardHandlingDynamicPage = createCategoryPageHandler({
    categorySlug: 'board-handling',
    categoryName: 'Board Handling',
    pageTitle: 'Board Handling Equipment',
    pageDescription: 'Professional PCB handling solutions including conveyors, loaders, and buffer systems.',
});

export default BoardHandlingDynamicPage;
