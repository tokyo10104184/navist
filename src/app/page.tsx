// src/app/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Optional: for structure
import { BookHeart } from "lucide-react"; // Example icon

export default function HomePage() {
  return (
    <div className="space-y-8"> {/* Increased overall spacing */}
      <div className="text-center py-8">
        <BookHeart className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
          育つ書斎 (My Library)
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Navistへようこそ！ここはあなたの学びの拠点。学習を進めることで、この書斎も成長していきます。
        </p>
      </div>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-2xl">あなたの学習スペース</CardTitle>
          <CardDescription>現在の書斎の様子です。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            今のところ、書斎は始まったばかりです。これから本棚にたくさんの知識が並び、達成の証であるトロフィーが飾られ、窓の外の景色も変わっていくことでしょう。
          </p>
          <p>
            日々の学習の記録が、この空間を豊かにしていきます。頑張りましょう！
          </p>
          {/* Placeholder for future dynamic elements like a bookshelf image or stats */}
          <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg text-center">
            <p className="font-semibold text-primary">次の目標に向けて、学習を始めましょう！</p>
          </div>
        </CardContent>
      </Card>

      {/* You could add more sections here, e.g., quick links or stats if available */}
    </div>
  );
}
