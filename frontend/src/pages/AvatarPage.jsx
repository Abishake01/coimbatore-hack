import { useParams } from 'react-router-dom';
import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import { Experience } from '../components/Experience';
import { UI } from '../components/UI';

export default function AvatarPage() {
  const { type } = useParams();

  return (
    <div className="min-h-screen w-full">
      <Loader />
      <Leva hidden />
      <div className="relative w-full h-screen bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900">
        <Canvas
          shadows
          camera={{ position: [0, 0, 1], fov: 30 }}
          gl={{ alpha: true }}
          onCreated={({ gl }) => gl.setClearColor('transparent', 0)}
          className="absolute inset-0 z-0"
        >
          <Experience />
        </Canvas>
        <div className="absolute inset-0 z-10">
          {/* Start at Q&A for the selected AI type, then switch to chat after generation */}
          <UI initialStage="qna" initialAI={type} />
        </div>
      </div>
    </div>
  );
}
