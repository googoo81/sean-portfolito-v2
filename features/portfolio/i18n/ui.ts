import type { Locale } from "@/lib/locale";

export type UiStrings = {
  introNameSuffix: string;
  introNamePrefix: string;
  skillsAria: string;
  stackToolsAria: string;
  allProjectsAria: string;
  openProjectAria: (title: string) => string;
  profilePhotoAria: (name: string) => string;
  themeToggleAria: string;
  themeToggleSr: string;
  themeToLight: string;
  themeToDark: string;
  localeToggleAria: string;
  localeToKo: string;
  localeToEn: string;
  social: {
    githubCopy: string;
    githubOpen: string;
    linkedinCopy: string;
    linkedinOpen: string;
    phoneCopy: string;
    phoneOpen: string;
    emailCopy: string;
    emailOpen: string;
  };
  projectFilter: {
    all: string;
    team: string;
    personal: string;
    kindAria: string;
    newest: string;
    oldest: string;
    sortAria: string;
    empty: string;
  };
  chrome: {
    close: string;
    home: string;
    maximize: string;
    restore: string;
    back: string;
    forward: string;
    projectList: string;
  };
  notes: {
    titleAria: string;
    titlePlaceholder: string;
    bodyAria: string;
    bodyPlaceholder: string;
  };
  video: {
    play: string;
    pause: string;
    unmute: string;
    mute: string;
    seek: string;
    fallbackLabel: (title: string) => string;
    previewFallback: string;
  };
  carousel: {
    prev: string;
    next: string;
  };
};

export const uiStrings: Record<Locale, UiStrings> = {
  ko: {
    introNameSuffix: " 입니다.",
    introNamePrefix: "",
    skillsAria: "Skills",
    stackToolsAria: "사용 도구",
    allProjectsAria: "모든 프로젝트",
    openProjectAria: (title) => `${title} 열기`,
    profilePhotoAria: (name) => `${name} 프로필 사진`,
    themeToggleAria: "테마 전환",
    themeToggleSr: "흑백 테마 전환",
    themeToLight: "라이트 모드로 전환",
    themeToDark: "다크 모드로 전환",
    localeToggleAria: "언어 전환",
    localeToKo: "한국어로 전환",
    localeToEn: "영어로 전환",
    social: {
      githubCopy: "Github 링크 복사",
      githubOpen: "Github로 이동",
      linkedinCopy: "LinkedIn 링크 복사",
      linkedinOpen: "LinkedIn으로 이동",
      phoneCopy: "전화번호 복사",
      phoneOpen: "전화 걸기",
      emailCopy: "이메일 주소 복사",
      emailOpen: "이메일 보내기",
    },
    projectFilter: {
      all: "전체",
      team: "팀",
      personal: "개인",
      kindAria: "프로젝트 유형",
      newest: "최신순",
      oldest: "오래된순",
      sortAria: "정렬",
      empty: "조건에 맞는 프로젝트가 없습니다.",
    },
    chrome: {
      close: "닫기",
      home: "홈으로",
      maximize: "전체 화면",
      restore: "창 크기 복원",
      back: "뒤로",
      forward: "앞으로",
      projectList: "프로젝트 목록",
    },
    notes: {
      titleAria: "메모 제목",
      titlePlaceholder: "제목",
      bodyAria: "메모 내용",
      bodyPlaceholder: "메모를 입력하세요",
    },
    video: {
      play: "재생",
      pause: "일시정지",
      unmute: "소리 켜기",
      mute: "소리 끄기",
      seek: "재생 위치",
      fallbackLabel: (title) => `${title} 영상`,
      previewFallback: "미리보기 이미지",
    },
    carousel: {
      prev: "이전 카드",
      next: "다음 카드",
    },
  },
  en: {
    introNameSuffix: ".",
    introNamePrefix: "I'm ",
    skillsAria: "Skills",
    stackToolsAria: "Tools I use",
    allProjectsAria: "All projects",
    openProjectAria: (title) => `Open ${title}`,
    profilePhotoAria: (name) => `Profile photo of ${name}`,
    themeToggleAria: "Toggle theme",
    themeToggleSr: "Toggle light and dark theme",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    localeToggleAria: "Toggle language",
    localeToKo: "Switch to Korean",
    localeToEn: "Switch to English",
    social: {
      githubCopy: "Copy Github link",
      githubOpen: "Open Github",
      linkedinCopy: "Copy LinkedIn link",
      linkedinOpen: "Open LinkedIn",
      phoneCopy: "Copy phone number",
      phoneOpen: "Call",
      emailCopy: "Copy email address",
      emailOpen: "Send email",
    },
    projectFilter: {
      all: "All",
      team: "Team",
      personal: "Personal",
      kindAria: "Project type",
      newest: "Newest",
      oldest: "Oldest",
      sortAria: "Sort",
      empty: "No projects match these filters.",
    },
    chrome: {
      close: "Close",
      home: "Home",
      maximize: "Enter full screen",
      restore: "Restore window",
      back: "Back",
      forward: "Forward",
      projectList: "Project list",
    },
    notes: {
      titleAria: "Note title",
      titlePlaceholder: "Title",
      bodyAria: "Note body",
      bodyPlaceholder: "Start writing…",
    },
    video: {
      play: "Play",
      pause: "Pause",
      unmute: "Unmute",
      mute: "Mute",
      seek: "Seek",
      fallbackLabel: (title) => `${title} video`,
      previewFallback: "Preview image",
    },
    carousel: {
      prev: "Previous card",
      next: "Next card",
    },
  },
};
