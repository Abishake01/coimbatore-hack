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
      <div className="relative w-full h-screen">
        <Canvas
          shadows
          camera={{ position: [0, 0, 1], fov: 30 }}
          className="absolute inset-0 z-0"
        >
          <Experience />
        </Canvas>
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Start at Q&A for the selected AI type, then switch to chat after generation */}
          <UI initialStage="qna" initialAI={type} />
        </div>
      </div>
    </div>
  );
}
