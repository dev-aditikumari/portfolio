import type { IconType } from "react-icons";
import { FaDatabase } from "react-icons/fa6";
import {
  SiDocker,
  SiExpress,
  SiGit,
  SiGithubactions,
  SiJavascript,
  SiJest,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPytest,
  SiPython,
  SiReact,
  SiRedux,
  SiSocketdotio,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiWebrtc,
} from "react-icons/si";

const icons: Record<string, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  database: FaDatabase,
  redux: SiRedux,
  tailwind: SiTailwindcss,
  socketio: SiSocketdotio,
  webrtc: SiWebrtc,
  python: SiPython,
  pandas: SiPandas,
  jest: SiJest,
  testinglibrary: SiTestinglibrary,
  pytest: SiPytest,
  docker: SiDocker,
  githubactions: SiGithubactions,
  postman: SiPostman,
  git: SiGit,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Component = icons[name] ?? FaDatabase;
  return <Component aria-hidden="true" className={className} />;
}

export const knownIcons = Object.keys(icons);
