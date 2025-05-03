
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  ChevronRight,
  Clock,
  Gift,
  History,
  Star,
  Sparkles,
  Trophy,
  Users
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const tiers = [
  {
    name: "Bronze",
    points: "0-999",
    current: false,
    benefits: [
      "Basic donor recognition",
      "Impact reports",
      "Newsletter subscription"
    ]
  },
  {
    name: "Silver",
    points: "1,000-2,499",
    current: true,
    benefits: [
      "All Bronze benefits",
      "Quarterly thank-you gifts",
      "Invitation to donor events",
      "Name recognition on website"
    ]
  },
  {
    name: "Gold",
    points: "2,500-4,999",
    current: false,
    benefits: [
      "All Silver benefits",
      "Priority volunteer opportunities",
      "Annual appreciation dinner",
      "Custom impact report"
    ]
  },
  {
    name: "Platinum",
    points: "5,000+",
    current: false,
    benefits: [
      "All Gold benefits",
      "Personalized facility tour",
      "Recognition plaque",
      "Advisory board invitation",
      "VIP event access"
    ]
  }
];

const rewards = [
  {
    id: "REW-001",
    name: "Gift Card ($25)",
    points: 1000,
    available: true,
    expires: "None",
    description: "A $25 gift card to a local grocery store of your choice.",
    icon: Gift
  },
  {
    id: "REW-002",
    name: "Branded Tote Bag",
    points: 500,
    available: true,
    expires: "None",
    description: "An eco-friendly tote bag with the GivingGroceries logo.",
    icon: ShoppingBag
  },
  {
    id: "REW-003",
    name: "Volunteer Recognition",
    points: 2000,
    available: true,
    expires: "None",
    description: "Special recognition at our volunteer appreciation event.",
    icon: Users
  },
  {
    id: "REW-004",
    name: "Premium Gift Basket",
    points: 3500,
    available: true,
    expires: "None",
    description: "A gift basket filled with premium local products and treats.",
    icon: Gift
  }
];

const history = [
  {
    id: "TRX-001",
    date: "April 20, 2025",
    description: "Donation: Central Food Bank",
    points: "+60",
    type: "earned"
  },
  {
    id: "TRX-002",
    date: "April 10, 2025",
    description: "Redeemed: Gift Card",
    points: "-1000",
    type: "redeemed"
  },
  {
    id: "TRX-003",
    date: "April 02, 2025",
    description: "Donation: Westside Community Center",
    points: "+90",
    type: "earned"
  },
  {
    id: "TRX-004",
    date: "March 25, 2025",
    description: "Bonus: Monthly donor",
    points: "+100",
    type: "earned"
  },
  {
    id: "TRX-005",
    date: "March 15, 2025",
    description: "Donation: South District Food Bank",
    points: "+110",
    type: "earned"
  }
];

// Create a ShoppingBag component to avoid undefined error since we're not importing from lucide-react
function ShoppingBag(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function RewardSystem() {
  const { toast } = useToast();
  
  const handleRedeem = (reward: any) => {
    toast({
      title: `Redeeming ${reward.name}`,
      description: "Processing your reward request...",
    });
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.name}. Check your email for details.`,
      });
    }, 1500);
  };

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Reward System</h1>
          <p className="text-muted-foreground">
            Earn rewards for your generous food donations
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Reward Status</CardTitle>
              <CardDescription>
                Current tier and progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Current Tier</p>
                    <p className="text-sm text-muted-foreground">Silver Donor</p>
                  </div>
                </div>
                <Badge className="bg-[#C0C0C0] hover:bg-[#C0C0C0]/80 text-white">Silver</Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Progress to Gold</p>
                  <p className="text-xs text-muted-foreground">1,240 / 2,500 points</p>
                </div>
                <Progress value={49} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">1,260 more points needed</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Available Points</p>
                  <p className="text-base font-semibold text-primary">1,240</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Lifetime Points</p>
                  <p className="text-sm">2,240</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Redeemed Points</p>
                  <p className="text-sm">1,000</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm" className="w-full">
                <History className="mr-2 h-4 w-4" />
                View Points History
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Reward Milestone</CardTitle>
              <CardDescription>
                Keep donating to reach the next tier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-hidden rounded-lg border p-6">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="rounded-full bg-yellow-100 p-3">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-xl">Gold Tier</h3>
                  <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                    Unlock exclusive benefits by reaching 2,500 points
                  </p>
                </div>
                
                <div className="absolute -top-12 -right-12">
                  <Sparkles className="h-32 w-32 rotate-12 opacity-5" />
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h4 className="font-medium text-sm">How to earn points:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span>5 points per pound of food donated</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span>10 points per pound of high-demand items</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span>100 bonus points for consistent monthly donations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span>200 bonus points for referring new donors</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rewards" className="space-y-4">
          <TabsList>
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            <TabsTrigger value="tiers">Reward Tiers</TabsTrigger>
            <TabsTrigger value="history">Points History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rewards">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {rewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{reward.name}</CardTitle>
                      <reward.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold">{reward.points} points</span>
                    </div>
                    {reward.expires !== "None" && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Expires: {reward.expires}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button 
                      onClick={() => handleRedeem(reward)}
                      disabled={reward.points > 1240} 
                      className="w-full"
                    >
                      {reward.points <= 1240 ? "Redeem Reward" : "Not Enough Points"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Button variant="outline">View All Rewards</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="tiers">
            <Card>
              <CardHeader>
                <CardTitle>Reward Tiers & Benefits</CardTitle>
                <CardDescription>
                  Benefits increase as you ascend through donation tiers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {tiers.map((tier) => (
                    <div 
                      key={tier.name}
                      className={`rounded-lg border ${tier.current ? 'border-primary bg-primary/5' : ''} p-4 relative overflow-hidden`}
                    >
                      {tier.current && (
                        <div className="absolute top-0 right-0">
                          <div className="w-16 h-16 bg-primary transform rotate-45 translate-x-8 -translate-y-8"></div>
                          <Star className="absolute top-1 right-1 h-3 w-3 text-white" />
                        </div>
                      )}
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg">{tier.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {tier.points} points
                        </p>
                        {tier.current && (
                          <Badge className="bg-primary">Current</Badge>
                        )}
                        <ul className="space-y-1 mt-4">
                          {tier.benefits.map((benefit, i) => (
                            <li key={i} className="text-sm flex items-start">
                              <ChevronRight className="h-3 w-3 mr-1 mt-1 text-primary" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Points History</CardTitle>
                <CardDescription>
                  Track your points earned and redeemed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className={`rounded-full p-1.5 ${
                          item.type === 'earned' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {item.type === 'earned' ? (
                            <Star className={`h-4 w-4 ${
                              item.type === 'earned' ? 'text-green-600' : 'text-blue-600'
                            }`} />
                          ) : (
                            <Gift className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{item.description}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <span className={`font-bold ${
                        item.type === 'earned' ? 'text-green-600' : 'text-blue-600'
                      }`}>{item.points}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline">View Complete History</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
