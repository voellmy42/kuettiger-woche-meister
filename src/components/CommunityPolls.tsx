import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, TrendingUp } from "lucide-react";

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

interface CommunityPollsProps {
  polls?: Poll[];
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
    category: "Veranstaltungen"
  },
];

export const CommunityPolls = ({ polls = defaultPolls }: CommunityPollsProps) => {
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [localPolls, setLocalPolls] = useState<Poll[]>(polls);

  // Load user votes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kuettiger-weekly-poll-votes");
    if (saved) {
      setUserVotes(JSON.parse(saved));
    }
  }, []);

  // Save user votes to localStorage
  useEffect(() => {
    localStorage.setItem("kuettiger-weekly-poll-votes", JSON.stringify(userVotes));
  }, [userVotes]);

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

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <MessageSquare className="h-5 w-5" />
          Community-Umfragen
          <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-800">
            <Users className="h-3 w-3 mr-1" />
            {localPolls.filter(p => p.isActive).length} aktiv
          </Badge>
        </CardTitle>
        <p className="text-sm text-blue-700">
          Ihre Meinung zählt! Stimmen Sie ab und gestalten Sie Küttigen mit.
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

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 Neue Umfrage vorschlagen</h4>
          <p className="text-sm text-blue-700 mb-3">
            Haben Sie eine Idee für eine Community-Umfrage? Teilen Sie uns Ihre Vorschläge mit!
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            Umfrage vorschlagen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
