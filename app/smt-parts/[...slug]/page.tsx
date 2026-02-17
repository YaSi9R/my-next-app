import { createCategoryPageHandler, createStaticParamsGenerator } from '@/lib/utils/category-page-handler';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

export const generateStaticParams = createStaticParamsGenerator('smt-parts');

const SmtPartsDynamicPage = createCategoryPageHandler({
    categorySlug: 'smt-parts',
    categoryName: 'SMT Parts',
    pageTitle: 'SMT Parts',
    pageDescription: 'Quality spare parts for all your SMT machines and production lines.',
});

export default SmtPartsDynamicPage;
