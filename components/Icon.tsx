import type { IconType } from "react-icons";
import { FaCloud, FaCode, FaCss3Alt, FaDatabase } from "react-icons/fa6";
import {
  SiDocker,
  SiExpress,
  SiApachespark,
  SiGit,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
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
  SiReactrouter,
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
  html5: SiHtml5,
  css3: FaCss3Alt,
  router: SiReactrouter,
  jwt: SiJsonwebtokens,
  spark: SiApachespark,
  cloud: FaCloud,
  code: FaCode,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Component = icons[name] ?? FaCode;
  return <Component aria-hidden="true" className={className} />;
}

export const knownIcons = Object.keys(icons);
