
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PlusCircle, FileText, BarChart } from "lucide-react";
import AuthRequired from "@/components/auth/AuthRequired";
import { RiskFactors } from "@/utils/riskCalculator";

interface Assessment extends RiskFactors {
  id: string;
  score: number;
  riskFactors: string[];
}

const Dashboard = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load assessments from localStorage
    const loadAssessments = () => {
      try {
        const storedAssessments = localStorage.getItem("assessments");
        if (storedAssessments) {
          setAssessments(JSON.parse(storedAssessments));
        }
      } catch (error) {
        console.error("Failed to load assessments:", error);
        toast.error("Failed to load your assessment history");
      } finally {
        setLoading(false);
      }
    };

    loadAssessments();
  }, []);

  const handleNewAssessment = () => {
    navigate("/assessment");
  };

  const handleViewAssessment = (id: string) => {
    // In a real application, this would navigate to a detailed view
    // For now, we'll just show a toast
    toast.info(`Viewing assessment ${id} details (would navigate to detailed view in production)`);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  // Get risk category based on score
  const getRiskCategory = (score: number) => {
    if (score < 30) return { category: "Low", color: "text-green-500" };
    if (score < 60) return { category: "Moderate", color: "text-yellow-500" };
    if (score < 80) return { category: "High", color: "text-orange-500" };
    return { category: "Very High", color: "text-red-500" };
  };

  return (
    <AuthRequired>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="heading-lg">My Dashboard</h1>
              <p className="text-muted-foreground">
                View and manage your lung cancer risk assessments
              </p>
            </div>
            <Button 
              onClick={handleNewAssessment} 
              className="bg-medical-600 hover:bg-medical-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Assessment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Assessments</CardTitle>
                <CardDescription>Your assessment history</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{assessments.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Latest Risk Score</CardTitle>
                <CardDescription>Your most recent evaluation</CardDescription>
              </CardHeader>
              <CardContent>
                {assessments.length > 0 ? (
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold">{assessments[0].score}%</p>
                    <p className={getRiskCategory(assessments[0].score).color}>
                      {getRiskCategory(assessments[0].score).category} Risk
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No assessments yet</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Last Assessment</CardTitle>
                <CardDescription>Date of your most recent test</CardDescription>
              </CardHeader>
              <CardContent>
                {assessments.length > 0 ? (
                  <p className="text-xl">{formatDate(assessments[0].RECORDED_DATE)}</p>
                ) : (
                  <p className="text-muted-foreground">No assessments yet</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Assessment History
              </CardTitle>
              <CardDescription>
                Review your past lung cancer risk assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-4">Loading your assessments...</p>
              ) : assessments.length === 0 ? (
                <div className="text-center py-8">
                  <BarChart className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-1">No Assessments Found</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't taken any lung cancer risk assessments yet.
                  </p>
                  <Button 
                    onClick={handleNewAssessment}
                    className="bg-medical-600 hover:bg-medical-700"
                  >
                    Take Your First Assessment
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Recorded By</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Risk Score</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assessments.map((assessment) => {
                        const { category, color } = getRiskCategory(assessment.score);
                        return (
                          <TableRow key={assessment.id}>
                            <TableCell>{formatDate(assessment.RECORDED_DATE)}</TableCell>
                            <TableCell>{assessment.RECORDED_BY}</TableCell>
                            <TableCell>{assessment.AGE}</TableCell>
                            <TableCell>{assessment.score}%</TableCell>
                            <TableCell>
                              <span className={color}>{category}</span>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewAssessment(assessment.id)}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Layout>
    </AuthRequired>
  );
};

export default Dashboard;
