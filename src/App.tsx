import { TiptapCollabProvider } from "@hocuspocus/provider";
import * as Y from "yjs";

import "./app.css";
import { TipTapEditor } from "./components/Editor/TipTapEditor";

const ydoc = new Y.Doc();
const provider = new TiptapCollabProvider({
  document: ydoc,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  baseUrl: import.meta.env.PROD
    ? import.meta.env.VITE_BE_URL
    : "ws://127.0.0.1:1221/live-collaboration",
  name: `live-collaboration-editor`,
  appId: "1234-live-collaboration-editor",
});

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Live Collaboration Editor! 👨‍💻
        </h1>
        <TipTapEditor provider={provider} ydoc={ydoc} />
      </div>
    </div>
  );
}

export default App;
