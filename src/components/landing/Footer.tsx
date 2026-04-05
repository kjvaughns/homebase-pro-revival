import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="w-full border-t border-border py-12 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="HomeBase logo" className="w-8 h-8" />
            <span className="text-lg font-bold">HomeBase</span>
          </div>
          <p className="text-sm text-muted-foreground">The all-in-one platform for home service professionals.</p>
        </div>
        {[
          { title: "Product", links: ["Features", "Pricing", "AI Booking", "HouseFax™"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          { title: "Legal", links: ["Privacy", "Terms", "Security"] },
        ].map(({ title, links }) => (
          <div key={title} className="space-y-4">
            <p className="text-sm font-semibold">{title}</p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-8 text-center">
        <p className="text-sm text-muted-foreground">© 2025 HomeBase Pro. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
