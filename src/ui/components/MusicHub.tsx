import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { Music2, Globe } from "lucide-react";
import { MusicPlayer } from "./MusicPlayer";
import { OnlineMusic } from "./OnlineMusic";

export function MusicHub() {
    return (
        <div className="w-full">
            <Tabs defaultValue="local" className="w-full">
                <div className="mb-4 flex justify-center">
                    <TabsList className="grid w-full max-w-sm grid-cols-2">
                        <TabsTrigger value="local" className="gap-2">
                            <Music2 className="h-4 w-4" />
                            Local Music
                        </TabsTrigger>
                        <TabsTrigger value="online" className="gap-2">
                            <Globe className="h-4 w-4" />
                            Online Music
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="local" className="mt-0">
                    <MusicPlayer />
                </TabsContent>

                <TabsContent value="online" className="mt-0">
                    <OnlineMusic />
                </TabsContent>
            </Tabs>
        </div>
    );
}