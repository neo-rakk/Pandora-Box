'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-5 gap-10 mb-20">
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm">Pandora Box</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">360° integrated communications for forward-thinking brands.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-xs">Services</h4>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground transition-colors">Communication</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Production</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Digital</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-xs">Solutions</h4>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground transition-colors">IoT & Connected</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Custom Software</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Immersive Exp</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-xs">Company</h4>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Why Us</a></li>
              <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-xs">Connect</h4>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Pandora Box. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
