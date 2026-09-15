import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.{' '}
        <a href="/PRD.pdf" download="Ufaq-Khalid-Portfolio-PRD.pdf">
          Download PRD (PDF)
        </a>
      </p>
    </footer>
  )
}
