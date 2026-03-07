// Single source of truth for all blog chapters.
// To add a chapter: append an entry to CHAPTERS, then create the HTML file.
const CHAPTERS = [
    { slug: 'designing-for-delight',             label: '1. Designing for Delight' },
    { slug: 'from-uc-berkeley-to-founder',        label: '2. From UC Berkeley to Founder' },
    { slug: 'launching-curlyhair-ai',             label: '3. Curly-Hair-ai.com' },
    { slug: 'engineering-poppers-infrastructure', label: '4. Engineering Popper\'s Infra' },
    { slug: 'building-in-public',                 label: '5. Building in Public' },
    { slug: 'building-love-into-code',            label: '6. Building Love into Code' },
    { slug: 'collaborating-with-bashnota',        label: '7. Collaborating with BashNota' },
    { slug: 'vibe-coding-a-website-from-scratch', label: '8. Vibe-Coding a Website' },
    { slug: 'the-gravity-of-learning',            label: '9. The Gravity of Learning' },
    { slug: 'training-small-models',              label: '10. Small Models, Sharp Instincts' },
    { slug: 'packing-masking-sequences',           label: '11. The Tokens You Don\'t See' },
];

(function () {
    const aside = document.querySelector('.blog-side-nav');
    if (!aside) return;

    const currentSlug = window.location.pathname
        .replace(/^\/blog\//, '')
        .replace(/\.html$/, '');

    const links = CHAPTERS.map(({ slug, label }) => {
        const active = slug === currentSlug ? ' class="side-nav-active"' : '';
        return `<a href="/blog/${slug}.html"${active}>${label}</a>`;
    }).join('\n                    ');

    aside.innerHTML = `
                <a href="/#writing" class="back-link">← Back to home</a>
                <h2 class="side-nav-title">Contents</h2>
                <a href="/blog/" class="side-nav-toc-link">Table of Contents</a>
                <nav class="side-nav-list">
                    ${links}
                </nav>`;
})();
