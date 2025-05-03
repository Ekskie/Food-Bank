
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Gift, Search, Users, BarChart, Package } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900">
        <div className="hero-pattern clip-custom py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Fighting Hunger, Building Communities</h1>
                  <p className="text-muted-foreground md:text-xl">
                    Connect food banks, donors, and volunteers to efficiently distribute food to those in need.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">Sign In</Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col space-y-4 rounded-xl border bg-background p-6 shadow-sm animate-fade-in">
                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">How It Works</h3>
                  <p className="text-sm text-muted-foreground">
                    Our platform connects three key stakeholders in the food assistance ecosystem:
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex flex-col items-center gap-2 rounded-lg border bg-background/50 p-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Gift className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="text-base font-medium">Donors</h4>
                    <p className="text-xs text-center text-muted-foreground">
                      Contribute food or resources to local food banks
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border bg-background/50 p-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="text-base font-medium">Food Banks</h4>
                    <p className="text-xs text-center text-muted-foreground">
                      Manage inventory and coordinate distribution
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border bg-background/50 p-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="text-base font-medium">Volunteers</h4>
                    <p className="text-xs text-center text-muted-foreground">
                      Support operations and help those in need
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our comprehensive platform offers tools for all participants in the food donation ecosystem
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Search className="h-5 w-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Food Bank Locator</h3>
                      <p className="text-muted-foreground">
                        Find nearby food banks, view their needs, and schedule donations or requests for assistance.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Inventory Management</h3>
                      <p className="text-muted-foreground">
                        Real-time tracking of food inventory with expiry date monitoring and smart distribution.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Gift className="h-5 w-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Donation Management</h3>
                      <p className="text-muted-foreground">
                        Schedule donations, track their journey, and see the impact of your contributions.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Beneficiary Management</h3>
                      <p className="text-muted-foreground">
                        Streamlined process for requesting food assistance and tracking request status.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Data Analysis & Reporting</h3>
                      <p className="text-muted-foreground">
                        Insightful analytics to understand food distribution patterns and identify improvement areas.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/20 p-2">
                      <Gift className="h-5 w-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Reward System</h3>
                      <p className="text-muted-foreground">
                        Recognition and incentives for donors and volunteers making significant contributions.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join Our Network Today</h2>
                <p className="text-muted-foreground md:text-xl">
                  Whether you want to donate, volunteer, or seek assistance, our platform connects you with the resources you need.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">Register Now</Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-xl border bg-muted p-8 shadow-sm">
                <div className="grid gap-2 text-center">
                  <h3 className="text-2xl font-bold">Our Impact</h3>
                  <div className="grid sm:grid-cols-3 gap-4 py-4">
                    <div>
                      <div className="text-3xl font-bold text-primary">85+</div>
                      <div className="text-sm text-muted-foreground">Food Banks</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">12K+</div>
                      <div className="text-sm text-muted-foreground">Donations</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">50K+</div>
                      <div className="text-sm text-muted-foreground">People Helped</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
