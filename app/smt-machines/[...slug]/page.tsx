import { createCategoryPageHandler, createStaticParamsGenerator } from '@/lib/utils/category-page-handler';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

export const generateStaticParams = createStaticParamsGenerator('smt-machines');

const SmtMachinesDynamicPage = createCategoryPageHandler({
    categorySlug: 'smt-machines',
    categoryName: 'SMT Machines',
    pageTitle: 'SMT Machines',
    pageDescription: 'Professional SMT equipment and machinery for surface mount technology production lines.',
});

export default SmtMachinesDynamicPage;
