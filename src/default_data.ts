import { Project } from "./App";

export interface PortfolioData {
  featuredProjects: Project[];
  personalProjects: Project[];
  introduction: string;
  profileImage?: string;
  education: {
    name: string;
    period: string;
    major: string;
  };
  certificates: {
    title: string;
    subtitle?: string;
    score?: string;
    rating?: string;
    ratio?: number;
    maxScale?: number;
  }[];
  workExperience: {
    company: string;
    tags: string;
    period: string;
    desc: string[];
  }[];
  activities: {
    title: string;
    period: string;
    org: string;
    desc: string[];
    articles?: {
      title: string;
      thumbnail: string;
      url: string;
      date: string;
    }[];
  }[];
  contact: {
    email: string;
    phone: string;
    instagram: string;
    instagramUrl: string;
    location: string;
  };
  techStack?: {
    label: string;
    items: string[];
  }[];
}

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  techStack: [
    {
      label: "DESIGN TOOL",
      items: ["일러스트레이터", "포토샵", "프리미어 프로"]
    },
    {
      label: "OFFICE",
      items: ["Microsoft office", "Google Workspace"]
    },
    {
      label: "COLLABORATION",
      items: ["Notion", "Slack", "Flow"]
    }
  ],
  featuredProjects: [
    {
      "title": "페스티벌 운영",
      "category": "운영",
      "year": "2024",
      "image": "https://raw.githubusercontent.com/2green-lee/Portfolio/9d41580d7739017f4b186f92faf6491a60264fd5/2024waterbomb.png",
      "contribution": "25%",
      "description": "워터밤, 인천펜타포트, 부산국제록페스티벌, 이슬라이브페스티벌 등 국내 대형 페스티벌의 현장 F&B, 공식 MD, 티켓 및 관객 관리 운영 총괄.",
      "fullDescription": "QueensSmile 모바일 플랫폼 및 무인 키오스크 시스템을 통합 적용하여 다수 페스티벌의 중추 부스를 성공적으로 설계·관리하였습니다.\n\n각 대행사 및 주최사의 요구사항을 충족하며, 사전 구매와 실시간 현장 판매를 병행하는 안정적인 온·오프라인 하이브리드 운영 구조를 구축해 다년의 노하우를 바탕으로 관객 병목을 최소화하고 고객사와의 신뢰를 공고히 했습니다.\n\n[주요 운영 실적]\n2024 WATERBOMB 전국\n2024 인천펜타포트국제록페스티벌\n2024 어썸뮤직페스티벌\n2024 이슬라이브 페스티벌\n2024 여수 썸머 뮤직 페스티벌\n2024 로즈아워 페스티벌\n2024 부산 국제 록 페스티벌\n2024 그린캠프 페스티벌",
      "role": {
        "title": "프로젝트 매니저 (PM)",
        "items": [
          "QueensSmile 플랫폼 내 각 행사 전용 상품 카테고리 구성 및 사전 거래 창구 개설",
          "현장 F&B, MD 부스, 매표소 및 게이트 레이아웃 디자인과 동선 병목 시뮬레이션",
          "현장 다용도 무인 단말기(키오스크) 세팅 및 예비 부품 가동 체계 완비",
          "현장 운영 스태프(도급 관리 등 약 100여 명 규모) 직무 교육 및 효율적 인솔",
          "주최 단체(부산축제조직위, 하이트진로 등) 및 외부 아티스트 기획사 파트너 관리",
          "동시간대 고유량(High-volume) 오더 시 대기 시간 최소화를 위한 긴급 임기응변 시스템 지휘"
        ]
      },
      "process": [
        {
          "phase": "사전 제안 및 기획 설계",
          "items": [
            "각 페스티벌별 관객 예측치 및 이동 경로 데이터를 기반으로 적정 부스 소요 계산",
            "QueensSmile 디지털 앱 내 시간 단위 사전 예약 발권 및 결제 연동 검증",
            "현장 운영 매뉴얼 설계 및 긴급 대응 체크리스트 준비"
          ]
        },
        {
          "phase": "현장 셋업 및 가동",
          "items": [
            "키오스크 실시간 통신 및 전력 안정성 체크, 스태프 포지션별 타임테이블 배포",
            "관객 입장, F&B 현장 배차, MD 정산 픽업 존 구획 분리를 통한 인파 안전 확보",
            "피크타임 대기 분산 프로토콜 가동 및 장비 및 통신 오류에 대한 빠른 백업"
          ]
        },
        {
          "phase": "정산 및 정합성 검증",
          "items": [
            "공식 굿즈 및 식음료 입출고 데이터 일치 및 누적 거래액 마감 리포트 작성",
            "미출고 아티스트 상품 완결 반출 및 주최사 최종 피드백 기반 성과 보고"
          ]
        }
      ],
      "results": [
        "지속적인 대형 관객 페스티벌 현장의 무사고 조율 달성",
        "디지털 예약 수령 수단 적용을 통해 기존 현장 구매 대비 대기 시간 평균 70% 이상 단축",
        "자사 기술 인프라(App, Kiosk, POS)와 인적 리소스의 하모니를 통한 운영 단가 최적화",
        "하이트진로, 부산축제조직위, 메이드온 등 다수 기획사로부터 탁월한 PM 역량 및 재계약 선호 통보"
      ],
      "details": [
        "모바일 애플리케이션 및 하드웨어 인프라 기반의 현장 전반 통제 및 관리",
        "대기 시간 최소화 및 구매 전환 극대화를 위한 현장 동선 구조 고도화",
        "클라이언트(주최사 및 파트너사)와의 긴밀하고 투명한 커뮤니케이션"
      ]
    },
    {
      "title": "공연 운영",
      "category": "공연운영",
      "year": "2019 - 2022",
      "image": "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg",
      "contribution": "60%",
      "description": "드림씨어터 및 주요 극장 라이선스 뮤지컬(위키드, 오페라의 유령 등), 내한 공연, 콘서트 실시간 하우스 운영 및 관객 서비스 설계.",
      "fullDescription": "드림씨어터 및 대형 공연장의 공연 운영을 담당하였습니다.\n\n각 제작사 및 대형 기획사의 요구사항을 충족하며, 관객의 극장 통제 동량 분석 및 실시간 좌석/안내 가이드를 수립했습니다. VIP 컨시어지 및 다수 하우스 크루를 성실히 지도하여 지연 관객 분산 재입장 및 아티스트 교환 루틴을 원활하게 마쳤습니다.\n\n[주요 공연 실적]\n• GREENERY 단독공연\n• Flower Planet\n• 열대야\n• 오후의 향기\n• 야간비행\n• 뮤지컬 오페라의 유령 내한공연\n• 뮤지컬 위키드\n• 뮤지컬 맘마미아\n• 뮤지컬 싯다르타\n• 뮤지컬 레베카\n• 뮤지컬 라이온킹 내한 공연",
      "role": {
        "title": "하우스 어텐던트, 프로젝트 매니저 (PM)",
        "items": [
          "관객 밀집 오디토리움 동선 설계 및 게이트별 유입 시간 분위수 조사",
          "공연 중 중도 입장자 및 퇴장 가이드라인 정립 및 실무 연계 조율",
          "하우스 어텐던트 및 크루 선발/교육과 돌발 상황 행동 매뉴얼 배포",
          "제작사(설앤컴퍼니 등) 및 예매처 통합 CS 실시간 연동 지원",
          "휠체어 배리어프리 가이드라인 및 거동 약자 밀착 케어",
          "공연장 비상사태 및 관객 응급 치료 처치 훈련 이수 및 구호 지원"
        ]
      },
      "process": [
        {
          "phase": "객석 및 하우스 정비 (사전)",
          "items": [
            "공연 시작 전 로비 인프라 가동 확인 및 하우스 객석 구역 최종 컨디션 점검",
            "티켓 발권처 및 공식 MD/프로그램북 캐비넷 부스 전력 안정성 및 이동 펜스 구획 설계",
            "공연 전 스태프 미팅을 통한 캐스팅 체인지 및 VIP 예매 현황 세부 전파"
          ]
        },
        {
          "phase": "공연 진행 및 동선 케어 (현장)",
          "items": [
            "오디토리움 문(Gate) 개방 및 좌석 등급별 관객 유도 스티커 안내 시행",
            "공연 시작 후 인터미션 가이드 및 암전 시 안내 장비(소형 캐미컬 라이트) 활용 분산동선 운영",
            "로비 대형 디스플레이와 무대 전광판 모니터 실시간 현황 트래킹 대응"
          ]
        },
        {
          "phase": "피드백 및 마무리 (사후)",
          "items": [
            "공연 마감 후 객석 분실물 일괄 확인 및 당일 컴플레인 조치 사항 일지 기록",
            "관객 피드백 기반 하우스 안내 스태프 타임테이블 및 배치표 개선 조절"
          ]
        }
      ],
      "results": [
        "드림씨어터 내 1,700석 규모 대형 오디토리움 다년 무사고 하우스 통제 달성",
        "지연 관객 대기 병목 최소화로 공연 시작 연계 딜레이 제로 실현",
        "공연장 시설 보호 및 제작사와의 긴밀한 파트너십 구축",
        "현장 컴플레인(시야 방해, 관람 예절 불이행)의 표준 신속 대응으로 관람 만족도 향상"
      ],
      "details": [
        "공연장 시설 및 하우스 현장 전반의 서비스 프로토콜 설계",
        "관객 안전 보장과 무소음 밀착 가이드를 통한 관람 고밀도화",
        "클라이언트(제작자, 주최사)와 극장 간의 긴밀하고 일관적인 조율"
      ]
    }
  ],
  personalProjects: [
    {
      title: "GREENERY : 푸르게 푸르게 푸르러져라",
      category: "상품기획",
      year: "2023",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img5.png",
      contribution: "70%",
      location: "Online & Offline Distribution",
      cast: "이그린 (Lee Green)",
      support: "텀블벅 크라우드 펀딩 프로젝트",
      description: "싱어송라이터 이그린 EP <GREENERY> 발매. 발매 작업기를 담은 책 형태의 새로운 앨범.",
      fullDescription: "싱어송라이터 ‘이그린’의 EP [GREENERY] 발매와 함께, 창작 과정과 영감을 기록한 아트북 형태의 피지컬 앨범을 기획·제작했습니다.\n\n효용성이 낮은 기존 플라스틱 CD의 한계를 문제로 정의하고, 이를 대체할 수 있는 새로운 형태의 앨범을 설계했습니다. 텀블벅 크라우드펀딩을 통해 목표 금액의 196%를 달성하며 프로젝트를 성공적으로 런칭했습니다.\n\n전곡 작사, 작곡, 프로듀싱은 물론, 디자인 디렉팅, 유통, 쇼케이스 기획까지 프로젝트 전반을 주도했습니다.",
      role: {
        title: "기획",
        items: [
          "Planning: 프로젝트 전체 기획\n펀딩 전략 수립",
          "Production: 앨범 제작\n책 디자인 및 출판\n아티스트 굿즈 제작",
          "Promotion: 펀딩 홍보 영상 제작\nSNS 운영\n라이브 영상 제작",
          "Operation: 쇼케이스 기획 및 진행"
        ]
      },
      results: [
        "텀블벅 크라우드 펀딩을 통해 프로젝트 자금 확보 및 시장 반응 검증 -> 텀블벅 크라우드 펀딩 196% 초과 달성\n목표 금액 대비 높은 참여율과 지지 확보",
        "책 형태의 아티스트 앨범 제작 및 유통 구조 구축 -> 앨범 제작 및 출판 완료\n온·오프라인 10개 판매처 입점 및 판매 진행",
        "출판 콘텐츠를 확장한 관객 참여형 프로그램 기획 -> '하나의 생각이 노래가 되기까지' 출판 프로모션 워크숍 진행",
        "다채널 홍보를 통한 프로젝트 인지도 확대 -> 펀딩 홍보 영상 제작\n인스타그램, 팟캐스트 등 온라인 채널 중심 홍보 운영",
        "앨범 발매를 알리는 오프라인 이벤트 기획 및 실행 -> 발매 쇼케이스 기획 및 진행"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2052.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/013cde7d59ad00b704b19423085d2b9bfc269884/img%2051.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2054.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2055.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2056.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2057.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2053.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2058.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2059.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2060.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2061.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2063.jpg"
      ]
    },
    {
      title: "Flower Planet",
      category: "Concert",
      year: "2022",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg",
      contribution: "70%",
      location: "KT&G 상상마당 부산 3F 라이브홀",
      support: "KT&G 상상마당 부산",
      cast: "우예린, 이그린",
      objectPosition: "top",
      description: "부산 아티스트 이그린과 서울 아티스트 우예린의 콜라보레이션 공연.",
      fullDescription: "부산을 기반으로 활동하는 아티스트 '이그린'과 서울의 아티스트 '우예린'이 만나 음악적 교감을 나누는 특별한 콜라보레이션 무대를 기획했습니다.\n\n서로 다른 지역적 배경을 가진 두 아티스트의 조화를 통해 새로운 관객층을 유입시키고, 단순한 공연을 넘어 체험형 콘텐츠를 결합하여 관객들에게 잊지 못할 경험을 선사하는 것을 목표로 했습니다. 기획부터 제작, 홍보, 현장 운영까지 공연의 전 단계에 걸쳐 밀도 높은 작업을 수행했습니다.",
      role: {
        title: "기획",
        items: [
          "Planning: 기획서 작성\n공연 전체 컨셉 수립",
          "Booking: 아티스트 섭외\n공연장(KT&G 상상마당) 조율",
          "Promotion: SNS 마케팅 전략 수립\n라이브 홍보 영상 기획",
          "Production: 포스터, 굿즈, 홍보 영상 등\n비주얼 에셋 제작 총괄",
          "Operation: 공연 당일 현장 운영\n타임테이블 관리"
        ]
      },
      results: [
        "지속 가능한 지역 음악 씬 활성화 & 아티스트 교류 유치 -> 지역 아티스트 '이그린'과 서울 아티스트 '우예린' 콜라보레이션 유치 및 공동 공연 성사",
        "관객 모객 규모 달성 (공간 수용 인원 100명 타겟) -> 적극적 사전 예매 촉진을 통해 유효 티켓 판매 총 50명 방문 달성",
        "체험 중심 콘텐츠 기획 및 영상 미디어 연출 -> 관객 몰입형 '헤나 체험 부스' 현장 운영 및 감성적인 '오프닝 콘셉트 영상' 자체 제작 및 상영",
        "온라인 홍보 다각화 및 타겟형 프로모션 전략 수립 -> 인스타그램 전용 고감도 루틴 홍보 영상 배포 및 '티켓 2+1 이벤트' 프로모션을 통한 사전 모객 극대화"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2041.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2042.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2043.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2044.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2045.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2046.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2047.jpg"
      ]
    },
    {
      title: "열대야",
      category: "Concert",
      year: "2022",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img3.jpg",
      contribution: "70%",
      location: "KT&G 상상마당 부산 13F 루프탑",
      support: "KT&G 상상마당 부산",
      cast: "From2020, Chilinkat, 이그린",
      objectPosition: "center",
      description: "도시에서 즐기는 한 여름 밤의 꿈. 도심의 건물 옥상에서 각양각색 인디 뮤지션의 음악을 즐긴다.",
      fullDescription: "도심 속 건물 옥상이라는 이색적인 공간에서 펼쳐지는 인디 음악 공연 시리즈입니다. '열대야'라는 테마에 맞춰 한여름 밤의 정취를 느낄 수 있는 아티스트 라인업과 공간 연출을 기획했습니다.\n\n관객들에게 일상 속 특별한 휴식을 선사하며, 지역 문화 공간의 활용도를 높이는 성공적인 사례를 만들었습니다. 기획부터 운영까지 전 과정을 주도하며 프로젝트의 완성도를 높였습니다.",
      role: {
        title: "기획",
        items: [
          "Planning: 프로젝트 기획서 작성\n콘셉트 수립 및 협업 파트너 대상 제안",
          "Booking: 아티스트 및 공연/행사 장소 섭외\n일정 및 조건 협의",
          "Promotion: 온라인 홍보 전략 수립 및 실행\n오프라인 프로모션 기획 및 운영",
          "Production: 홍보물 및 콘텐츠 제작\n온·오프라인 홍보 자료 관리",
          "Operation: 행사 진행 및 운영 관리"
        ]
      },
      results: [
        "시민들이 주말 저녁에 향유할 수 있는 접근성 높은 공연 콘텐츠 기획 및 제공 -> 티켓 판매 전석 매진 달성",
        "공간 및 브랜드 협업을 통한 프로젝트 운영 효율 및 관객 경험 강화 -> KT&G 상상마당 루프탑 공간 대관 \n와인·핑거푸드 등 연계 프로모션 제공",
        "다채널 홍보를 통한 공연 인지도 확산 -> 상상마당 부산 및 HAO 공식 인스타그램을 활용한 온라인 홍보 진행 \n배너 및 공연 홍보 영상 제작·배포"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2031.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2032.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2033.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2034.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2035.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2036.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2037.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2038.jpg"
      ]
    },
    {
      title: "오후의 향기",
      category: "Concert",
      year: "2021",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img2.jpg",
      contribution: "70%",
      location: "파나카 F (Panaca F) 야외 테라스",
      support: "복합문화공간 파나카",
      cast: "이그린, 오후의 향기 콜라보 레이블",
      description: "나른한 오후를 채우는 향기로운 일탈. 감각적인 커피 향과 라이브 재즈/인디 음악의 하모니.",
      fullDescription: "나른한 오후의 시간대를 따뜻하고 감성적인 인디 음악으로 채워내는 야외 소규모 콘서트 브랜드 '오후의 향기'를 기획했습니다.\n\n바쁜 일상을 벗어나 향긋한 커피와 차, 그리고 아티스트의 생생한 목소리를 가까이에서 감상할 수 있는 감각 집중형 이벤트를 타겟팅했습니다.\n\n컨셉 조율, 현장 동선 및 음향 연출, 아티스트 라인업 구성과 티켓 예약 관리를 총괄했습니다.",
      role: {
        title: "기획",
        items: [
          "Planning: 공간 기반 힐링 콘셉트 기획 / 시즌 필터링 음료 패키지 기획",
          "Booking: 인디 싱어송라이터 섭외 / 음향 엔지니어 및 테라스 조율",
          "Promotion: 한정 관객 대상 타겟 SNS 마케팅 / 입소문 추천 및 오프라인 배너",
          "Operation: 당일 하우스 가이드 구현 / 커피 브루잉 타임 세션 연계 조화"
        ]
      },
      results: [
        "소규모 타겟 매니아 관객층 완전 모객 성공 -> 전석 매진 및 만족도 100% 만족 달성",
        "음료 패키지와 공연 관람 연계 수입 극대화 -> 아티스트 보증 및 파트너 카페 추가 수익 창출",
        "야외 공간 및 연출 조작 정합 완성 -> 자연광 및 주변 소음을 조화롭게 제어하는 현장 연출 성공"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/013cde7d59ad00b704b19423085d2b9bfc269884/img%2051.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img5.png"
      ]
    },
    {
      title: "야간비행",
      category: "Concert",
      year: "2021",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img1.jpg",
      contribution: "70%",
      location: "파나카노트 지하 라이브 스테이지",
      support: "파나카노트 (Panaca Note)",
      cast: "이그린, 로컬 리스너 세션",
      description: "별이 빛나는 밤, 음악으로 떠나는 가상의 밤하늘 여행. 앰비언트 비주얼과 모던한 시티팝/어쿠스틱 연출.",
      fullDescription: "생텍쥐페리의 소설 '야간비행'에서 영감을 받아, 모던하고 몽환적인 밤의 사운드 아카이브를 라이브 무대로 재현한 콘서트 시리즈입니다.\n\n어두운 실내 공간에 별빛을 형상화한 프로젝션 맵핑과 조명 디렉팅을 접목하여 시청각을 고루 자극하는 몰입도 높은 연출을 완성했습니다.\n\n총괄 연출, 무대 기획, 영상 이펙트 및 비주얼 라이팅 디렉팅, 공연장 셋업과 관객 입장 가이드를 운영하였습니다.",
      role: {
        title: "기획",
        items: [
          "Planning: 문학 콘텐츠 기반 옴니버스 콘셉트 / 조명 및 영상 맵핑 시나리오 작수",
          "Booking: 앰비언트/어쿠스틱 톤 아티스트 섭외 / 기술 엔지니어 파트너십 유치",
          "Production: 시각 특수 효과 트랙 구성 / 소품 큐레이션 및 포스터 디자인 감수",
          "Operation: 타임코드 동기화 연출 진행 / 심야 시간대 관객 귀가 동선 안전 가이드"
        ]
      },
      results: [
        "감각적 라이팅 쇼와 미디어 연출 완성도 호평 -> 인스타 해시태그 확산 및 후속 시리즈 제작 문의 폭주",
        "실험적 낭독 결합 공연의 대중성 확인 -> 비주얼 아트 티켓 판매율 기회 대비 120% 성과 달성",
        "무사고 테크니컬 쇼 및 씬 동기화 정밀 작동 -> 암전 상태의 신속 하우스 크루 가이드 안착"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2053.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg"
      ]
    }
  ],
  introduction: "즐거운 일탈의 경험을 기획하는 기획자 이근일 입니다",
  profileImage: "https://raw.githubusercontent.com/2green-lee/Portfolio/7fe5749c4d7157e49816af496d35e3466760aa25/my-notion-face-portrait.png",
  education: {
    name: "부산대학교",
    period: "2013 - 2021",
    major: "항공우주공학 & 예술문화영상학"
  },
  certificates: [
    { title: "TOEIC SPEAKING", subtitle: "AL", rating: "Level 9/11", ratio: 9/11 },
    { title: "TOEIC", subtitle: "830", rating: "830/990", ratio: 830/990 },
    { title: "ADsP", subtitle: "데이터 분석 준전문가", score: "데이터 분석 준전문가" },
    { title: "워드프로세서", subtitle: "단일등급", score: "단일등급" },
    { title: "운전면허증", subtitle: "1종보통", score: "1종보통" }
  ],
  workExperience: [
    {
      company: "퀸즈스마일",
      tags: "기획/운영 · 인턴/수습 · PM(프로젝트매니저)",
      period: "2024.05 ~ 2024.10",
      desc: [
        "국내외 페스티벌 및 공연 기획 및 운영",
        "워터밤, 펜타포트 등 대형 페스티벌 현장 운영 참여 및 실무 지원",
        "자사 플랫폼 UX/UI 개선 프로젝트 참여 (개발팀 협업)",
        "공연 및 이벤트 운영 관련 자료 정리 및 내부 공유 문서 제작",
        "고객 서비스 채널 운영 및 문의 대응 프로세스 관리"
      ]
    },
    {
      company: "드림씨어터",
      tags: "고객서비스 · 아르바이트 · 하우스어텐던트",
      period: "2019.10 ~ 2022.05",
      desc: [
        "대형 라이선스 공연 관객 서비스 및 현장 운영 지원",
        "특이사항 및 현장 돌발 이슈 해결 및 대응",
        "공연장 안전 관리 및 운영 프로세스 이행"
      ]
    }
  ],
  activities: [
    { 
      title: "광고·마케팅 동아리 CREATOR", 
      period: "2019.03 ~ 2021.02", 
      org: "부산대학교",
      desc: ["영상 콘텐츠 및 카피라이팅 기획/제작", "마케팅 콘텐츠 기획 및 실행 경험", "공모전 수상"] 
    },
    { 
      title: "청년 UNIVERSITY 기획자 양성 프로그램", 
      period: "2021.06 ~ 2021.12", 
      org: "부산문화재단",
      desc: ["프로젝트 기획–운영–성과 분석 전 과정 수행", "결과 보고서 작성 및 발표"] 
    },
    { 
      title: "아트모아 기자단 2기", 
      period: "2022.09 ~ 2022.12", 
      org: "예술경영지원센터",
      desc: ["산업 리서치 및 전문가 인터뷰 기획/진행", "문화산업 관련 콘텐츠 작성 및 인사이트 도출"],
      articles: [
        {
          title: "[기류] 복합문화공간의 진화, 공연 예술과 음료 패키지의 독창적 만남",
          thumbnail: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=400&q=80",
          url: "https://www.gokams.or.kr/visual-art/main.aspx",
          date: "2022.09.15"
        },
        {
          title: "[트렌드] 어둠 전시장 속 빛을 비추다 - 프로젝션 맵핑과 조명 미디어 아트 연출",
          thumbnail: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=400&q=80",
          url: "https://www.gokams.or.kr/visual-art/main.aspx",
          date: "2022.10.02"
        },
        {
          title: "[공간 리뷰] 파나카노트 지하에서 울려 퍼지는 인디 아티스트들의 라이브 토크",
          thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80",
          url: "https://www.gokams.or.kr/visual-art/main.aspx",
          date: "2022.10.28"
        },
        {
          title: "[인터뷰] 문학과 음악의 이색 결합: '야간비행' 콘서트 제작 현장 이야기",
          thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=400&q=80",
          url: "https://www.gokams.or.kr/visual-art/main.aspx",
          date: "2022.11.14"
        },
        {
          title: "[스페셜 레포트] 친환경 야외 뮤직 페스티벌 가이드라인 구축을 위한 인터뷰 및 조사",
          thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80",
          url: "https://www.gokams.or.kr/visual-art/main.aspx",
          date: "2022.12.05"
        }
      ]
    },
    { 
      title: "파나카노트 공연 기획 PD", 
      period: "2021", 
      org: "복합문화공간",
      desc: ["공연 기획 및 음향 총괄"] 
    },
    { 
      title: "한일청년 교류회", 
      period: "2019.03 ~ 2021.02", 
      org: "부산 한일문화교류협회",
      desc: ["한일 대학생 교류 프로그램 기획 및 운영 참여", "해외 프로그램 봉사활동"] 
    }
  ],
  contact: {
    email: "lgi12@naver.com",
    phone: "010-9335-9620",
    instagram: "darkreen___n",
    instagramUrl: "https://www.instagram.com/darkreen___n/",
    location: "Seoul, South Korea"
  }
};

export const DEFAULT_FESTIVAL_TICKET = [
  {
    phase: "사전 온라인 티켓 오픈 및 관리",
    label: "PRE-EVENT",
    items: [
      {
        title: "예매처 및 플랫폼 제휴 정비",
        body: "네이버, 인터파크, 멜론티켓 등 멀티 예매 채널 시스템 가동 및 연동 완료."
      },
      {
        title: "오픈 시스템 및 정원 관리",
        body: "각 지역별 1차, 2차 예매 전용 수량 제한 프로토콜 및 대기열 분산 솔루션 구성."
      }
    ]
  },
  {
    phase: "현장 무인 단말기 및 매표 서비스 점검",
    label: "ON-SITE",
    items: [
      {
        title: "스마트 키오스크 및 QR 스캐너 연동",
        body: "모바일 QR 입장권 실시간 하이퍼 스캔 적용, 인당 수령 지연 3초 이내 조율."
      },
      {
        title: "예외 부스 운영 및 신분증 실명 확인",
        body: "미성년자 차단 및 팔찌 변조 검사, 교통/유도 시뮬레이션 및 안내선 펜스 설치."
      }
    ]
  },
  {
    phase: "정산 및 티켓 대사 정합성 분석",
    label: "POST-EVENT",
    items: [
      {
        title: "최종 발권 통계 및 실시간 회수 분석",
        body: "온라인 정합 비율 99.9% 검수, 미회수 팔찌 가치 정산 리포터 발행."
      },
      {
        title: "파트너 정산 일치",
        body: "공식 파트너사 및 기획 대행사 최종 정산 데이터 마감 및 최종 승인 완료."
      }
    ]
  }
];

export const DEFAULT_FESTIVAL_FNB = [
  {
    phase: "현장 식음료 입점 제안 및 부스 배치 설계",
    label: "PRE-EVENT",
    items: [
      {
        title: "F&B 파트너 엄선 및 제휴",
        body: "전국 인기 푸드트럭 및 브랜드 제너럴 엄선 제안, 메뉴/소비전력 적합성 승인."
      },
      {
        title: "동선 및 화재 조절 가이드",
        body: "LPG 가스 및 고전력 부스 레이아웃 분리, 대기열이 타 구역을 침해하지 않도록 안전 간격 형성."
      }
    ]
  },
  {
    phase: "실시간 모바일 오더 수급 조절",
    label: "ON-SITE",
    items: [
      {
        title: "QueensSmile 원스톱 스마트 스마트 오더",
        body: "줄 서지 않는 예약 시간별 픽업 운영, 현장 피크타임 동량 75% 이상 분배 조율."
      },
      {
        title: "위생 정비 및 공급 조율",
        body: "식자재 당일 급송 보관 차량 냉동탑차 정합 검사, 소화 기구 가깝게 설치 및 위생 점검 순찰."
      }
    ]
  },
  {
    phase: "정합성 및 매출 정산 검토",
    label: "POST-EVENT",
    items: [
      {
        title: "각 사업자별 순매출 자동 배분 정합",
        body: "PG 결제수수료 및 정산율 매핑, 행사 종료 후 3영업일 內 실시간 대사표 발행."
      }
    ]
  }
];

export const DEFAULT_FESTIVAL_STORAGE = [
  {
    phase: "사전 고용량 물품 및 부스 인프라 셋업",
    label: "PRE-EVENT",
    items: [
      {
        title: "초고속 보관 백 수급 및 넘버링 시스템",
        body: "방수 비닐 백 다량 구비, 사양 넘버링 및 보안 인덱스 라벨 발행."
      },
      {
        title: "물리 테이블 및 안전 가드라인",
        body: "인파 고정 펜스 라인 및 비 안 맞는 천막 동선 설계."
      }
    ]
  },
  {
    phase: "현장 고속 입고 및 정전 대응 접수",
    label: "LIVE-CONTROL",
    items: [
      {
        title: "수령·접수 투 트랙 분리 운영",
        body: "입고와 출고 부스 전면 고정 분리, 피크타임 접수 병목 최소화 실현."
      },
      {
        title: "바코드 실시간 매핑 및 보관",
        body: "고유 넘버링 스티커 대조 접수 및 보관, 구획별 수납 완료."
      }
    ]
  },
  {
    phase: "유실물 보존 및 행사 정산 마감",
    label: "POST-EVENT",
    items: [
      {
        title: "미수령 물품 리스트업 및 인계 조율",
        body: "유실물 유예기간 보관, 주최처 이송 및 고객 확인 채널 연결."
      }
    ]
  }
];

