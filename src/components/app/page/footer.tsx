import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py:16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-medium">Hospital Civil de Guadalajara</h3>
            <p className="mb-4 text-slate-400">
              Proveedor de servicios de salud excepcionales en tres hospitales para satisfacer todas sus necesidades médicas.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-slate-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-slate-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="text-slate-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-slate-400 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Links rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-slate-400 hover:text-white">
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link to="#" className="text-slate-400 hover:text-white">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="#" className="text-slate-400 hover:text-white">
                  CIAM
                </Link>
              </li>
              <li>
                <Link to="#" className="text-slate-400 hover:text-white">
                  Donar Sangre
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Nuestros hospitales</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/campus/north" className="text-slate-400 hover:text-white">
                  Fray Antonio Alcalde
                </Link>
              </li>
              <li>
                <Link to="/campus/east" className="text-slate-400 hover:text-white">
                  Dr. Juan I. Menchaca
                </Link>
              </li>
              <li>
                <Link to="/campus/west" className="text-slate-400 hover:text-white">
                  Hospital Civil de Oriente
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 text-slate-400" />
                <span className="text-slate-400">(555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 text-slate-400" />
                <span className="text-slate-400">info@hcg.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-slate-400" />
                <span className="text-slate-400">123 Medical Drive, North City, NC 12345</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Hospital Civil de Guadalajara. Todos los derechos reservados.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/privacy-policy" className="hover:text-white">
              Política de Privacidad
            </Link>
            <Link to="/terms-of-service" className="hover:text-white">
              Términos de Servicio
            </Link>
            <Link to="/accessibility" className="hover:text-white">
              Accesibilidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
