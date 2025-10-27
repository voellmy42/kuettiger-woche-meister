import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Users, TrendingUp, Lightbulb, Plus, ThumbsUp, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  isActive: boolean;
  endDate: string;
  category: string;
}

interface PollIdea {
  id: string;
  question: string;
  description?: string;
  category: string;
  submittedBy: string;
  submittedAt: string;
  votes: number;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
}

const defaultPolls: Poll[] = [
  {
    id: "bike-lanes-2024",
    question: "Sollten wir mehr Fahrradwege in Küttigen bauen?",
    options: [
      { id: "yes", text: "Ja, mehr Fahrradwege wären toll", votes: 47 },
      { id: "no", text: "Nein, die bestehenden reichen aus", votes: 23 },
      { id: "maybe", text: "Nur in bestimmten Bereichen", votes: 31 },
    ],
    totalVotes: 101,
    isActive: true,
    endDate: "2024-10-31",
    category: "Infrastruktur"
  },
  {
    id: "30er-zone",
    question: "Soll im Dorf 30er Zone generell gültig sein?",
    options: [
      { id: "yes", text: "Ja", votes: 28 },
      { id: "no", text: "Nein", votes: 19 },
    ],
    totalVotes: 70,
    isActive: true,
    endDate: "2024-11-15",
    category: "Verkehr"
  },
];

const defaultPollIdeas: PollIdea[] = [
  {
    id: "idea-1",
    question: "Sollte Küttigen ein eigenes Schwimmbad bekommen?",
    description: "Ein kleines Hallenbad für die Gemeinde wäre toll für Familien und Senioren.",
    category: "Infrastruktur",
    submittedBy: "Maria Muster",
    submittedAt: "2024-10-15",
    votes: 23,
    status: "pending"
  },
  {
    id: "idea-2",
    question: "Sollten wir mehr Bäume in der Dorfmitte pflanzen?",
    description: "Für mehr Grün und Schatten in den heissen Sommermonaten.",
    category: "Umwelt",
    submittedBy: "Hans Beispiel",
    submittedAt: "2024-10-12",
    votes: 18,
    status: "pending"
  },
  {
    id: "idea-3",
    question: "Sollte es einen regelmässigen Flohmarkt geben?",
    description: "Ein monatlicher Flohmarkt auf dem Dorfplatz könnte die Gemeinschaft stärken.",
    category: "Veranstaltungen",
    submittedBy: "Anna Test",
    submittedAt: "2024-10-10",
    votes: 31,
    status: "approved"
  },
];

const PollsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [localPolls, setLocalPolls] = useState<Poll[]>(defaultPolls);
  const [pollIdeas, setPollIdeas] = useState<PollIdea[]>(defaultPollIdeas);
  const [ideaVotes, setIdeaVotes] = useState<Record<string, boolean>>({});
  
  // Form state for new poll idea
  const [newIdea, setNewIdea] = useState({
    question: "",
    description: "",
    category: "",
    submittedBy: ""
  });
  
  const { toast } = useToast();

  // Load user data from localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem("kuettiger-weekly-poll-votes");
    if (savedVotes) {
      setUserVotes(JSON.parse(savedVotes));
    }
    
    const savedIdeas = localStorage.getItem("kuettiger-weekly-poll-ideas");
    if (savedIdeas) {
      setPollIdeas(JSON.parse(savedIdeas));
    }
    
    const savedIdeaVotes = localStorage.getItem("kuettiger-weekly-idea-votes");
    if (savedIdeaVotes) {
      setIdeaVotes(JSON.parse(savedIdeaVotes));
    }
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    localStorage.setItem("kuettiger-weekly-poll-votes", JSON.stringify(userVotes));
  }, [userVotes]);

  useEffect(() => {
    localStorage.setItem("kuettiger-weekly-poll-ideas", JSON.stringify(pollIdeas));
  }, [pollIdeas]);

  useEffect(() => {
    localStorage.setItem("kuettiger-weekly-idea-votes", JSON.stringify(ideaVotes));
  }, [ideaVotes]);

  const handleVote = (pollId: string, optionId: string) => {
    if (userVotes[pollId]) {
      return; // User already voted
    }

    setUserVotes(prev => ({
      ...prev,
      [pollId]: optionId
    }));

    // Update poll data
    setLocalPolls(prev => prev.map(poll => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map(option => 
          option.id === optionId 
            ? { ...option, votes: option.votes + 1 }
            : option
        );
        return {
          ...poll,
          options: updatedOptions,
          totalVotes: poll.totalVotes + 1
        };
      }
      return poll;
    }));
  };

  const handleIdeaVote = (ideaId: string) => {
    if (ideaVotes[ideaId]) {
      return; // User already voted
    }

    setIdeaVotes(prev => ({
      ...prev,
      [ideaId]: true
    }));

    setPollIdeas(prev => prev.map(idea => 
      idea.id === ideaId 
        ? { ...idea, votes: idea.votes + 1 }
        : idea
    ));
  };

  const handleSubmitIdea = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newIdea.question || !newIdea.category || !newIdea.submittedBy) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }

    const idea: PollIdea = {
      id: `idea-${Date.now()}`,
      question: newIdea.question,
      description: newIdea.description,
      category: newIdea.category,
      submittedBy: newIdea.submittedBy,
      submittedAt: new Date().toISOString().split('T')[0],
      votes: 0,
      status: 'pending'
    };

    setPollIdeas(prev => [idea, ...prev]);
    setNewIdea({ question: "", description: "", category: "", submittedBy: "" });
    
    toast({
      title: "Ideen-Vorschlag eingereicht",
      description: "Vielen Dank für Ihren Vorschlag! Er wird von der Redaktion geprüft.",
    });
  };

  const getPercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const formatEndDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-CH', { 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const formatSubmitDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-CH', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'implemented': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Wartend';
      case 'approved': return 'Genehmigt';
      case 'rejected': return 'Abgelehnt';
      case 'implemented': return 'Umsgesetzt';
      default: return 'Unbekannt';
    }
  };

  // Sort poll ideas by votes (descending)
  const sortedPollIdeas = useMemo(() => {
    return [...pollIdeas].sort((a, b) => b.votes - a.votes);
  }, [pollIdeas]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Community-Umfragen</h1>
          <p className="text-lg text-muted-foreground">
            Ihre Meinung zählt! Stimmen Sie ab und schlagen Sie neue Umfragen vor.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Aktive Umfragen</TabsTrigger>
            <TabsTrigger value="ideas">Ideen-Bibliothek</TabsTrigger>
            <TabsTrigger value="submit">Ideen einreichen</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <MessageSquare className="h-5 w-5" />
                  Aktive Community-Umfragen
                  <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-800">
                    <Users className="h-3 w-3 mr-1" />
                    {localPolls.filter(p => p.isActive).length} aktiv
                  </Badge>
                </CardTitle>
                <p className="text-sm text-blue-700">
                  Stimmen Sie ab und gestalten Sie Küttigen mit.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {localPolls.filter(poll => poll.isActive).map((poll) => {
                    const userVote = userVotes[poll.id];
                    const hasVoted = !!userVote;
                    
                    return (
                      <div key={poll.id} className="border border-blue-200 rounded-lg p-4 bg-white">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {poll.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Endet am {formatEndDate(poll.endDate)}
                              </span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-3">
                              {poll.question}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground ml-4">
                            <TrendingUp className="h-4 w-4" />
                            {poll.totalVotes} Stimmen
                          </div>
                        </div>

                        <div className="space-y-2">
                          {poll.options.map((option) => {
                            const percentage = getPercentage(option.votes, poll.totalVotes);
                            const isUserChoice = hasVoted && userVote === option.id;
                            
                            return (
                              <div key={option.id} className="relative">
                                <Button
                                  variant={isUserChoice ? "default" : "ghost"}
                                  className={`w-full justify-start h-auto p-3 ${
                                    hasVoted 
                                      ? "cursor-default hover:bg-transparent" 
                                      : "cursor-pointer hover:bg-blue-50"
                                  } ${
                                    isUserChoice 
                                      ? "bg-blue-600 text-white" 
                                      : hasVoted 
                                        ? "bg-gray-100 text-gray-600" 
                                        : "bg-white border border-gray-200 text-gray-900 hover:border-blue-300"
                                  }`}
                                  onClick={() => !hasVoted && handleVote(poll.id, option.id)}
                                  disabled={hasVoted}
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <span className="text-left flex-1">{option.text}</span>
                                    {hasVoted && (
                                      <span className="text-sm font-medium ml-2">
                                        {percentage}% ({option.votes})
                                      </span>
                                    )}
                                  </div>
                                </Button>
                                
                                {hasVoted && (
                                  <div className="mt-1">
                                    <Progress 
                                      value={percentage} 
                                      className="h-2"
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {hasVoted && (
                          <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                            ✓ Vielen Dank für Ihre Stimme!
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ideas" className="mt-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Lightbulb className="h-5 w-5" />
                  Umfrage-Ideen Bibliothek
                  <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
                    {pollIdeas.length} Ideen
                  </Badge>
                </CardTitle>
                <p className="text-sm text-green-700">
                  Stimmen Sie für Ihre Lieblings-Ideen! Die beliebtesten werden von der Redaktion umgesetzt.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedPollIdeas.map((idea) => {
                    const hasVoted = ideaVotes[idea.id];
                    
                    return (
                      <div key={idea.id} className="border border-green-200 rounded-lg p-4 bg-white">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {idea.category}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getStatusColor(idea.status)}`}
                              >
                                {getStatusText(idea.status)}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {idea.question}
                            </h3>
                            {idea.description && (
                              <p className="text-sm text-gray-600 mb-3">
                                {idea.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {idea.submittedBy}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatSubmitDate(idea.submittedAt)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              size="sm"
                              variant={hasVoted ? "default" : "outline"}
                              onClick={() => !hasVoted && handleIdeaVote(idea.id)}
                              disabled={hasVoted}
                              className={hasVoted ? "bg-green-600" : ""}
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {idea.votes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submit" className="mt-6">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Plus className="h-5 w-5" />
                  Neue Umfrage-Idee einreichen
                </CardTitle>
                <p className="text-sm text-purple-700">
                  Haben Sie eine Idee für eine Community-Umfrage? Teilen Sie uns Ihre Vorschläge mit!
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitIdea} className="space-y-4">
                  <div>
                    <Label htmlFor="question">Umfrage-Frage *</Label>
                    <Input
                      id="question"
                      value={newIdea.question}
                      onChange={(e) => setNewIdea(prev => ({ ...prev, question: e.target.value }))}
                      placeholder="z.B. Sollte Küttigen ein eigenes Schwimmbad bekommen?"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Beschreibung (optional)</Label>
                    <Textarea
                      id="description"
                      value={newIdea.description}
                      onChange={(e) => setNewIdea(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Erklären Sie Ihre Idee genauer..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Kategorie *</Label>
                    <Select 
                      value={newIdea.category} 
                      onValueChange={(value) => setNewIdea(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Kategorie wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Infrastruktur">Infrastruktur</SelectItem>
                        <SelectItem value="Verkehr">Verkehr</SelectItem>
                        <SelectItem value="Umwelt">Umwelt</SelectItem>
                        <SelectItem value="Veranstaltungen">Veranstaltungen</SelectItem>
                        <SelectItem value="Bildung">Bildung</SelectItem>
                        <SelectItem value="Soziales">Soziales</SelectItem>
                        <SelectItem value="Sport">Sport</SelectItem>
                        <SelectItem value="Sonstiges">Sonstiges</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="submittedBy">Ihr Name *</Label>
                    <Input
                      id="submittedBy"
                      value={newIdea.submittedBy}
                      onChange={(e) => setNewIdea(prev => ({ ...prev, submittedBy: e.target.value }))}
                      placeholder="Ihr Name"
                      className="mt-1"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Idee einreichen
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-primary text-primary-foreground mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">Küttiger Weekly</p>
          <p className="text-sm opacity-80">Ihre digitale Wochenzeitung für Küttigen</p>
          <p className="text-xs opacity-60 mt-4">© {new Date().getFullYear()} Küttiger Weekly. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
};

export default PollsPage;
