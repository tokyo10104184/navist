// src/features/connected-learning/components/LearningStatusReport.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";

export interface SubjectFocus {
  name: string;
  progress: number; // 0-100
  focusTime: string; // e.g., "5h 30m"
}

export interface LearningReportData {
  studentName: string;
  reportingPeriod: string; // e.g., "Last 7 Days"
  timeSpentTotal: string;
  subjects: SubjectFocus[];
  recentAchievements: string[];
  areasForAttention: string[];
}

interface LearningStatusReportProps {
  reportData: LearningReportData;
}

export default function LearningStatusReport({ reportData }: LearningStatusReportProps) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-muted/30">
        <CardTitle className="text-2xl">{reportData.studentName}さんの学習状況レポート</CardTitle>
        <CardDescription>期間：{reportData.reportingPeriod} | 総学習時間：<span className="font-semibold">{reportData.timeSpentTotal}</span></CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center"><Clock className="mr-2 h-5 w-5 text-primary" />科目別フォーカスと進捗</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>科目</TableHead>
                <TableHead>集中時間</TableHead>
                <TableHead className="w-[150px]">進捗</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.subjects.map((subject) => (
                <TableRow key={subject.name}>
                  <TableCell className="font-medium">{subject.name}</TableCell>
                  <TableCell>{subject.focusTime}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm w-10">{subject.progress}%</span>
                        <Progress value={subject.progress} className="flex-1 h-3 [&>div]:bg-green-500" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {reportData.recentAchievements.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center"><CheckCircle className="mr-2 h-5 w-5 text-green-600" />最近の達成事項</h3>
            <ul className="list-disc list-inside space-y-1 pl-2">
              {reportData.recentAchievements.map((ach, index) => (
                <li key={index} className="text-muted-foreground">{ach}</li>
              ))}
            </ul>
          </div>
        )}

        {reportData.areasForAttention.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center"><AlertTriangle className="mr-2 h-5 w-5 text-destructive" />要点・復習エリア</h3>
            <ul className="list-disc list-inside space-y-1 pl-2">
              {reportData.areasForAttention.map((area, index) => (
                <li key={index} className="text-muted-foreground">{area}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
