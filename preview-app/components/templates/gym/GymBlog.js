import CustomLink from '@/components/CustomLink';

const blogPosts = [
  {
    img: '/gym/img/blog/blog-1.jpg',
    date: 'July 2, 2025',
    title: 'Physical fitness may help prevent depression and anxiety',
    excerpt: 'Studies show that regular exercise significantly reduces symptoms of depression and anxiety. Discover how a consistent fitness routine can transform your mental health.',
    author: 'Coach Rachel',
    comments: 20,
  },
  {
    img: '/gym/img/blog/blog-2.jpg',
    date: 'June 28, 2025',
    title: 'The best exercises to lose belly fat and tone up fast',
    excerpt: 'Targeted workouts combined with smart nutrition can help you shed stubborn belly fat and build a lean, toned physique in just 8 weeks.',
    author: 'Coach Tom',
    comments: 15,
  },
  {
    img: '/gym/img/blog/blog-3.jpg',
    date: 'June 20, 2025',
    title: 'How to build muscle mass with the right nutrition plan',
    excerpt: 'Muscle growth is 70% nutrition. Learn how to calculate your macros, time your meals, and choose the right supplements to maximize your gains.',
    author: 'Lisa Chen',
    comments: 32,
  },
];

export default function GymBlog() {
  return (
    <section className="blog-section spad">
      <div className="container">
        <div className="section-title">
          <span>Our Blog</span>
          <h2>TIPS &amp; FITNESS GUIDES</h2>
        </div>
        <div className="blog-grid">
          {blogPosts.map((post, i) => (
            <div key={i} className="blog-item">
              <div className="blog-pic">
                <img src={post.img} alt={post.title} />
              </div>
              <div className="blog-text">
                <div className="blog-meta">
                  <span><i className="fa fa-calendar" /> {post.date}</span>
                  <span><i className="fa fa-comment" /> {post.comments} Comments</span>
                  <span><i className="fa fa-user" /> {post.author}</span>
                </div>
                <h4><a href="#">{post.title}</a></h4>
                <p>{post.excerpt}</p>
                <a href="#" className="blog-btn">Read More <i className="fa fa-long-arrow-right" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
