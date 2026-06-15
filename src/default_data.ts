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
    country?: {
      code: string;
      name: string;
    } | null;
    desc: string[];
    awards?: {
      title: string;
      date: string;
      org: string;
    }[];
    articles?: {
      title: string;
      thumbnail: string;
      url: string;
      date: string;
    }[];
    images?: string[];
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
  "featuredProjects": [
    {
      "title": "페스티벌 운영",
      "category": "운영",
      "year": "2024",
      "image": "https://raw.githubusercontent.com/2green-lee/Portfolio/9d41580d7739017f4b186f92faf6491a60264fd5/2024waterbomb.png",
      "ticketImages": [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/56c4f5445b717b306b75e71ace91b475a1d6d8cf/ticket%201.jpeg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/56c4f5445b717b306b75e71ace91b475a1d6d8cf/ticket%202.jpeg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/26d00476109ec84b3d9f253c464088f278d4051b/ticket3.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/26d00476109ec84b3d9f253c464088f278d4051b/ticket4.jpg"
      ],
      "fnbImages": [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/bfe56c116e09a1caaea1b2ccf474a1498975af18/kiosk%201.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/bfe56c116e09a1caaea1b2ccf474a1498975af18/kiosk%202.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/bfe56c116e09a1caaea1b2ccf474a1498975af18/food4.jpeg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/1f77a94cdeca5069b8f04f33d81f2b7a323a4c07/food5.jpg"
      ],
      "storageImages": [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/lock%202.jpeg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/lock%203.jpeg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/lock%205.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/lcok%206.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/MD1.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/4446a5d2c5b32572cad3167985cfa66c83cf632d/MD2.jpg"
      ],
      "contribution": "25%",
      "description": "주최사의 운영 효율을 높이는 안정적인 온·오프라인 하이브리드 운영 구조를 구축했습니다.",
      "fullDescription": "모바일 예약 플랫폼(QueensSmile)과 현장 시스템을 연계하여 대형 페스티벌의 티켓, F&B, MD, 물품보관소 등의 운영 업무를 수행했습니다.\n\n행사별 운영 리스크 관리부터 온라인 상품 등록 및 판매 관리, 협력사 섭외 및 계약, 물류 일정 조율, 스태프 채용 및 교육까지 사전 운영 체계를 구축하였으며, 현장에서는 고객 동선 관리와 실시간 이슈 대응을 통해 운영을 이끌었습니다. 또한 이벤트 이후 채널톡 서비스를 통해 고객 응대(CS), 환불 및 정산 업무까지 수행하며 행사 운영의 전 과정을 관리했습니다.\n\n[주요 운영 실적]\n2024 WATERBOMB 전국\n2024 인천펜타포트국제록페스티벌\n2024 어썸뮤직페스티벌\n2024 이슬라이브 페스티벌\n2024 여수 썸머 뮤직 페스티벌\n2024 로즈아워 페스티벌\n2024 부산 국제 록 페스티벌\n2024 그린캠프 페스티벌",
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
      ],
      "processTicket": [
        {
          "phase": "사전 운영",
          "label": "PRE-EVENT",
          "items": [
            {
              "title": "티켓 발송 및 수량 관리",
              "body": "모바일 스마트 티켓 발송 및 전체 수량 관리, 기획사 및 스폰서용 초대권 배분 관리"
            },
            {
              "title": "고객 문의(CS) 전담 응대",
              "body": "티켓 예매, 취소, 환불 등 관객들의 사전 문의 사항 직접 응대 및 처리"
            }
          ]
        },
        {
          "phase": "현장 운영",
          "label": "ON-SITE",
          "items": [
            {
              "title": "티켓 부스 총괄 및 현장 판매",
              "body": "페스티벌 현장 티켓 부스 총책임자로서 부스 운영을 이끌고 현장 오프라인 발권 및 티켓 판매 진행"
            },
            {
              "title": "스태프 채용 및 교육",
              "body": "티켓 부스에서 일할 현장 스태프를 사전에 채용하고, 발권 시스템 사용법 및 고객 응대 방법 교육"
            },
            {
              "title": "현장 이슈 직접 대응",
              "body": "QR코드 인식 오류, 본인 확인 문제 등 티켓 관련 현장 이슈 및 관객 컴플레인 발생 시 직접 나서서 해결"
            }
          ]
        },
        {
          "phase": "사후 관리",
          "label": "POST-EVENT",
          "items": [
            {
              "title": "환불 및 최종 마감",
              "body": "페스티벌 종료 후 미사용 티켓 환불 처리 및 티켓 관련 최종 고객 문의(CS) 해결"
            }
          ]
        }
      ],
      "processFnB": [
        {
          "phase": "사전 운영",
          "label": "PRE-EVENT",
          "items": [
            {
              "title": "푸드 업체 섭외 및 계약",
              "body": "페스티벌에 입점할 푸드 업체를 섭외하고 입점 계약서 작성"
            },
            {
              "title": "구청 위생과 인허가 처리",
              "body": "관할 구청 위생과와 소통하여 페스티벌 기간 내 음식 판매를 위한 '한시적 영업신고' 등 임시 판매 권한 발급 진행"
            },
            {
              "title": "어플 내 사전 판매 세팅",
              "body": "예약 어플(퀸즈스마일) 내에 푸드 업체의 메뉴와 상품을 등록하고 사전 판매 관리"
            }
          ]
        },
        {
          "phase": "현장 운영",
          "label": "ON-SITE",
          "items": [
            {
              "title": "푸드 구역(F&B 존) 총괄",
              "body": "푸드 구역 전체의 현장 이슈를 종합적으로 관리하고 통제"
            },
            {
              "title": "현장 스태프 관리",
              "body": "푸드 구역 담당 스태프 채용 및 교육 진행"
            },
            {
              "title": "대기열 및 혼잡도 관리",
              "body": "점심/저녁 등 혼잡한 시간대에 부스 대기줄 관리. 현장이 막히지 않도록 어플 내 상품 판매 상태를 켜고 끄며(On/Off) 실시간 통제"
            }
          ]
        },
        {
          "phase": "사후 관리",
          "label": "POST-EVENT",
          "items": [
            {
              "title": "환불 처리 및 정산",
              "body": "행사 종료 후 음식 및 결제 관련 고객 문의(CS), 환불 처리 및 계약된 푸드 업체들과의 최종 대금 정산"
            }
          ]
        }
      ],
      "processStorage": [
        {
          "phase": "사전 운영",
          "label": "PRE-EVENT",
          "items": [
            {
              "title": "물류 및 장비 일정 관리",
              "body": "MD 상품과 물품보관소 운영에 필요한 장비(선반, 비닐 팩 등)가 행사 기간에 맞춰 현장에 도착하도록 창고 및 물류 업체와 일정 조율"
            },
            {
              "title": "어플 내 사전 판매 오픈",
              "body": "예약 어플(퀸즈스마일)에 사전 구매용 MD 상품과 물품보관권을 등록하고 온라인 판매 진행"
            }
          ]
        },
        {
          "phase": "현장 운영",
          "label": "ON-SITE",
          "items": [
            {
              "title": "MD 부스 및 보관소 총괄",
              "body": "MD 상품 진열, 현장 판매 및 실시간 재고 관리 진행. 수많은 짐을 보관하고 찾는 보관소 동선 관리 및 현장 돌발 이슈 대응"
            },
            {
              "title": "스태프 채용 및 교육",
              "body": "각 부스(MD, 물품보관소)를 담당할 스태프를 채용하고, 판매 포스(POS)기 사용법, 짐 보관 시스템 매뉴얼, 고객 응대 방법 교육"
            }
          ]
        },
        {
          "phase": "사후 관리",
          "label": "POST-EVENT",
          "items": [
            {
              "title": "고객 환불 및 문의(CS) 해결",
              "body": "불량 MD 상품 교환/환불 처리 및 보관소 분실물 문의, 미사용 건에 대한 최종 고객 문의 응대"
            },
            {
              "title": "재고 마감 및 최종 정산",
              "body": "행사 기간 동안 판매된 MD 상품의 최종 남은 재고 대조 및 매출 마감, 보관소 운영 관련 최종 비용 정산"
            }
          ]
        }
      ]
    },
    {
      "title": "공연 운영",
      "category": "공연운영",
      "year": "2019 - 2022",
      "image": "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg",
      "contribution": "40%",
      "description": "드림씨어터 및 주요 극장 라이선스 뮤지컬(위키드, 오페라의 유령 등), 내한 공연, 콘서트 실시간 하우스 운영 및 관객 서비스 설계.",
      "fullDescription": "기획공연 제작과 공연장 하우스 운영 경험을 바탕으로 공연 운영 전반을 수행했습니다.\n\n공연 기획 및 제작 과정에서는 공연 콘셉트 기획, 홍보 콘텐츠 제작, 참여 아티스트 및 스태프 커뮤니케이션, 무대 연출 등을 담당했습니다.\n\n공연 운영 측면에서는 하우스 어텐던트로 다년간 근무하며 객석 운영, 관객 동선 관리, 현장 컴플레인 및 이슈 관리를 수행하며 공연 관람 환경을 조성했습니다.\n\n[주요 공연 실적]\n• GREENERY 단독공연\n• Flower Planet\n• 열대야\n• 오후의 향기\n• 야간비행\n• 오페라의 유령 내한공연\n• 위키드\n• 캣츠 내한 공연\n• 라이온킹 내한 공연\n• 레베카\n• 맘마미아\n• 싯다르타\n• 백조의 호수\n• 시카고",
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
      "processHouse": [
        {
          "phase": "사전 준비 및 객석 세팅",
          "items": [
            {
              "title": "공연장 컨디션 점검",
              "body": "관객 입장 전 객석 청결 상태, 좌석 이상 유무 및 비상 대피 동선 사전 점검"
            },
            {
              "title": "당일 운영 매뉴얼 숙지",
              "body": "러닝타임, 인터미션(휴식 시간), 지연 관객 입장 타이밍 등 당일 공연 특이사항 숙지 및 스태프 회의"
            },
            {
              "title": "로비 편의시설 오픈 준비",
              "body": "로비 내 물품보관소, 오페라글라스 대여소, 주차 정산소 등 관객 서비스 데스크 오픈 및 세팅"
            }
          ]
        },
        {
          "phase": "현장 및 객석 운영",
          "items": [
            {
              "title": "객석 안내 및 지연 관객 통제",
              "body": "관객 티켓 확인 후 정확한 좌석 안내, 공연 시작 후 늦게 도착한 지연 관객들을 정해진 타이밍에 맞춰 안전하게 입장 유도"
            },
            {
              "title": "객석 내 돌발 상황 대응",
              "body": "공연 중 불법 사진/영상 촬영 통제, 소음 발생이나 응급 환자 발생 등 객석 내 돌발 상황 실시간 대처"
            },
            {
              "title": "인터미션(휴식 시간) 로비 통제",
              "body": "짧은 휴식 시간 동안 로비 및 화장실로 몰리는 인파 혼잡도 관리 및 안전 통제"
            }
          ]
        },
        {
          "phase": "사후 및 안전 관리",
          "items": [
            {
              "title": "안전 퇴장 유도",
              "body": "공연 종료 후 수천 명의 관객이 한 번에 몰리지 않도록 구역별 퇴장 동선 안내 및 병목 현상 방지"
            },
            {
              "title": "분실물 관리",
              "body": "전체 관객 퇴장 후 객석 내 분실물 꼼꼼히 확인 및 유실물 센터 인계"
            },
            {
              "title": "운영 리포트",
              "body": "당일 객석 내 특이사항 및 접수된 관객 컴플레인 내역을 하우스 매니저에게 최종 보고"
            }
          ]
        }
      ],
      "processConcert": [
        {
          "phase": "공연 기획 및 총괄",
          "items": [
            {
              "title": "공연 컨셉 및 프로그램 기획",
              "body": "각 공연의 타이틀(열대야, 야간비행 등)에 맞는 무대 컨셉 디자인"
            }
          ]
        },
        {
          "phase": "비주얼 디렉팅 및 마케팅",
          "items": [
            {
              "title": "홍보물 기획 및 디자인",
              "body": "일러스트레이터, 미리캔버스 등을 활용해 공연 포스터, 웹 플라이어, SNS 홍보물 등 디자인 기획 및 제작"
            },
            {
              "title": "영상 콘텐츠 제작",
              "body": "프리미어 프로를 활용해 아티스트 인터뷰, 공연 홍보 숏츠 등 부가 영상 콘텐츠 제작"
            }
          ]
        },
        {
          "phase": "무대 연출 및 현장 진행",
          "items": [
            {
              "title": "현장 연출 및 큐시트 관리",
              "body": "전체 공연 진행 큐시트 작성 및 음향/조명 스태프와의 현장 커뮤니케이션"
            },
            {
              "title": "참여진 매니지먼트",
              "body": "참여 아티스트 및 밴드 세션들과 커뮤니케이션, 무대 동선 및 대기실 관리"
            },
            {
              "title": "수익금 정산 및 마감",
              "body": "티켓 판매 및 펀딩 수익금 최종 정산, 대관료 및 세션 페이 지급 등 프로젝트 정산"
            }
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
  "personalProjects": [
    {
      "title": "GREENERY : 푸르게 푸르게 푸르러져라",
      "category": "상품기획",
      "year": "2023",
      "image": "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img5.png",
      "representativeImages": [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img5.png",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2053.jpg"
      ],
      "contribution": "70%",
      "location": "Online & Offline Distribution",
      "cast": "이그린 (Lee Green)",
      "support": "텀블벅 크라우드 펀딩 프로젝트",
      "description": "싱어송라이터 이그린 EP <GREENERY> 발매. 발매 작업기를 담은 책 형태의 새로운 앨범.",
      "fullDescription": "싱어송라이터 ‘이그린’의 EP [GREENERY] 발매와 함께, 창작 과정과 영감을 기록한 아트북 형태의 피지컬 앨범을 기획·제작했습니다.\n\n효용성이 낮은 기존 플라스틱 CD의 한계를 문제로 정의하고, 이를 대체할 수 있는 새로운 형태의 앨범을 설계했습니다. 텀블벅 크라우드펀딩을 통해 목표 금액의 196%를 달성하며 프로젝트를 성공적으로 런칭했습니다.\n\n작사, 작곡, 프로듀싱의 음악 제작부터 앨범 디자인 디렉팅, 유통, 쇼케이스 기획까지 프로젝트 전반을 주도했습니다.",
      "role": {
        "title": "기획",
        "items": [
          "Planning: 프로젝트 전체 기획\n펀딩 전략 수립",
          "Production: 앨범 제작\n책 디자인 및 출판\n아티스트 굿즈 제작",
          "Promotion: 펀딩 홍보 영상 제작\nSNS 운영\n라이브 영상 제작",
          "Operation: 쇼케이스 기획 및 진행"
        ]
      },
      "results": [
        "텀블벅 크라우드 펀딩 프로젝트 기획 -> 196% 모금 성공",
        "책 형태의 아티스트 앨범 제작 및 유통 앨범 제작/출판 -> 10개 판매처 판매중",
        "출판 프로모션 워크숍 기획 -> <하나의 생각이 노래가 되기까지> 워크숍 운영",
        "온/오프라인 홍보 펀딩 홍보 영상 제작 -> 인스타그램, 팟캐스트 등 온라인 홍보 진행",
        "<GREENERY> 발매 쇼케이스 기획 -> 23년 12월 01일 <GREENERY> 쇼케이스 진행"
      ],
      "images": [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2052.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2053.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/013cde7d59ad00b704b19423085d2b9bfc269884/img%2051.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2054.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2055.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2058.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2056.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2057.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2059.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2060.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2061.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2063.jpg"
      ]
    },
    {
      "title": "Flower Planet",
      "category": "Concert",
      "year": "2022",
      "image": "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg",
      "contribution": "70%",
      "location": "KT&G 상상마당 부산 3F 라이브홀",
      "support": "KT&G 상상마당 부산",
      "cast": "우예린, 이그린",
      "objectPosition": "top",
      "description": "부산 아티스트 이그린과 서울 아티스트 우예린의 콜라보레이션 공연.",
      "fullDescription": "다른 지역을 기반으로 활동하는 두 아티스트의 만남을 통해 새로운 관객층의 유입을 이끌고, 지역 음악 씬의 수요를 확장하고자 했습니다.\n\n공연은 우예린의 음악에 자주 등장하는 소재인 ‘꽃’에서 착안한 ‘꽃 행성’이라는 콘셉트로 구성되었습니다. 관객들은 꽃 행성의 주민인 ‘꽃 행성인’으로 초대되어 입장과 함께 꽃 모양 헤나를 팔목에 새기고, 공연의 세계관에 자연스럽게 참여하게 됩니다.\n\n하나의 행성으로 기획된 공간 속에서 관객들은 아티스트의 음악과 함께 꽃 행성의 이야기를 여행하며 새로운 경험을 즐길 수 있도록 설계했습니다.",
      "role": {
        "title": "기획",
        "items": [
          "Planning: 기획서 작성\n공연 전체 컨셉 수립",
          "Booking: 아티스트 섭외\n공연장(KT&G 상상마당) 조율",
          "Promotion: SNS 마케팅 전략 수립\n라이브 홍보 영상 기획",
          "Production: 포스터, 굿즈, 홍보 영상 등\n비주얼 에셋 제작 총괄",
          "Operation: 공연 당일 현장 운영\n타임테이블 관리"
        ]
      },
      "results": [
        "지속 가능한 지역 음악 씬 활성화 & 아티스트 교류 유치 -> 지역 아티스트 '이그린'과 서울 아티스트 '우예린' 콜라보레이션 유치 및 공동 공연 성사",
        "관객 모객 규모 달성 (공간 수용 인원 100명 타겟) -> 적극적 사전 예매 촉진을 통해 유효 티켓 판매 총 50명 방문 달성",
        "체험 중심 콘텐츠 기획 및 영상 미디어 연출 -> 관객 몰입형 '헤나 체험 부스' 현장 운영 및 감성적인 '오프닝 콘셉트 영상' 자체 제작 및 상영",
        "온라인 홍보 다각화 및 타겟형 프로모션 전략 수립 -> 인스타그램 전용 고감도 루틴 홍보 영상 배포 및 '티켓 2+1 이벤트' 프로모션을 통한 사전 모객 극대화"
      ],
      "images": [
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
      "title": "열대야",
      "category": "Concert",
      "year": "2022",
      "image": "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img3.jpg",
      "contribution": "70%",
      "location": "KT&G 상상마당 부산 13F 루프탑",
      "support": "KT&G 상상마당 부산",
      "cast": "From2020, Chilinkat, 이그린",
      "objectPosition": "center",
      "description": "도시에서 즐기는 한 여름 밤의 꿈. 도심의 건물 옥상에서 각양각색 인디 뮤지션의 음악을 즐긴다.",
      "fullDescription": "KT&G 상상마당 부산과 협업하여 기획한 여름 루프탑 공연입니다. 도심 속 건물 옥상이라는 이색적인 공간을 활용해, 바쁜 일상에서 벗어나 한여름 밤의 여유와 낭만을 즐길 수 있는 특별한 공연 경험을 제공하고자 했습니다.\n\n'열대야'를 테마로 와인과 핑거푸드, 그리고 다양한 장르의 음악을 함께 즐길 수 있도록 구성했으며, 공연 관람에 최적화된 8월의 여름 밤과 루프탑 정원의 분위기를 적극 활용해 공간 자체가 하나의 콘텐츠가 되도록 기획했습니다.\n\n관객들에게는 그해 여름을 오래 기억할 수 있는 따뜻한 추억과 작은 일탈의 경험을 선사하고, 지역 문화 공간의 새로운 활용 가능성을 제시하고자 했습니다. 기획부터 섭외, 홍보, 현장 운영까지의 업무를 수행했습니다.",
      "role": {
        "title": "기획",
        "items": [
          "Planning: 프로젝트 기획서 작성\n콘셉트 수립 및 협업 파트너 대상 제안",
          "Booking: 아티스트 및 공연/행사 장소 섭외\n일정 및 조건 협의",
          "Promotion: 온라인 홍보 전략 수립 및 실행\n오프라인 프로모션 기획 및 운영",
          "Production: 홍보물 및 콘텐츠 제작\n온·오프라인 홍보 자료 관리",
          "Operation: 행사 진행 및 운영 관리"
        ]
      },
      "results": [
        "시민들이 주말 저녁에 향유할 수 있는 접근성 높은 공연 콘텐츠 기획 및 제공 -> 티켓 판매 전석 매진 달성",
        "공간 및 브랜드 협업을 통한 프로젝트 운영 효율 및 관객 경험 강화 -> KT&G 상상마당 루프탑 공간 대관 \n와인·핑거푸드 등 연계 프로모션 제공",
        "다채널 홍보를 통한 공연 인지도 확산 -> 상상마당 부산 및 HAO 공식 인스타그램을 활용한 온라인 홍보 진행 \n배너 및 공연 홍보 영상 제작·배포"
      ],
      "images": [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2031.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2032.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2033.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2034.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2035.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2036.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2037.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2038.jpg"
      ]
    },
    {
      "title": "오후의 향기",
      "category": "Concert",
      "year": "2021",
      "image": "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img2.jpg",
      "contribution": "70%",
      "location": "파나카 F (Panaca F)",
      "support": "부산문화재단",
      "cast": "이그린, 오후의 향기 콜라보 레이블",
      "description": "나른한 오후를 채우는 향기로운 일탈. 감각적인 커피 향과 라이브 재즈/인디 음악의 하모니.",
      "fullDescription": "나른한 오후의 시간대를 따뜻하고 감성적인 인디 음악으로 채워내는 야외 소규모 콘서트 브랜드 '오후의 향기'를 기획했습니다.\n\n바쁜 일상을 벗어나 향긋한 커피와 차, 그리고 아티스트의 생생한 목소리를 가까이에서 감상할 수 있는 감각 집중형 이벤트를 타겟팅했습니다.\n\n컨셉 조율, 현장 동선 및 음향 연출, 아티스트 라인업 구성과 티켓 예약 관리를 총괄했습니다.",
      "role": {
        "title": "기획",
        "items": [
          "기획: 기획서 작성, 전체 컨셉 기획",
          "섭외: 아티스트 및 공연 베뉴 섭외",
          "홍보: 인스타그램 홍보, 라이브 영상 촬영",
          "제작: 홍보 영상 제작, 오프라인 디자인 제작",
          "운영: 현장 운영 및 이슈 관리"
        ]
      },
      "results": [
        "소규모 타겟 매니아 관객층 완전 모객 성공 -> 전석 매진 및 만족도 100% 만족 달성",
        "음료 패키지와 공연 관람 연계 수입 극대화 -> 아티스트 보증 및 파트너 카페 추가 수익 창출",
        "야외 공간 및 연출 조작 정합 완성 -> 자연광 및 주변 소음을 조화롭게 제어하는 현장 연출 성공"
      ],
      "images": [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/013cde7d59ad00b704b19423085d2b9bfc269884/img%2051.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img5.png"
      ]
    },
    {
      "title": "야간비행",
      "category": "Concert",
      "year": "2021",
      "image": "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img1.jpg",
      "contribution": "70%",
      "location": "김해 하라식당 루프탑",
      "support": "경남음악창작소",
      "cast": "이그린, 로컬 리스너 세션",
      "description": "별이 빛나는 밤, 음악으로 떠나는 가상의 밤하늘 여행. 앰비언트 비주얼과 모던한 시티팝/어쿠스틱 연출.",
      "fullDescription": "'야간비행'은 지역 아티스트와 로컬 공간을 연결하는 기획 공연으로, 지역 뮤지션들에게는 새로운 무대와 관객을 만날 기회를 제공하고, 관객들에게는 지역의 다양한 음악을 경험할 수 있는 문화 콘텐츠를 선보이고자 기획되었습니다. 이를 통해 지역 음악씬의 자생력을 강화하고, 로컬 공간이 새로운 문화의 거점으로 자리매김하는 계기를 만들고자 했습니다.\n\n공연은 늦은 밤 비행을 떠나는 여행자의 시선에서 착안하여 기획되었으며, 관객들이 일상에서 잠시 벗어나 음악을 통해 새로운 감정과 풍경을 마주할 수 있도록 구성했습니다. 지역 아티스트들의 개성이 담긴 무대와 공간 연출을 통해 도심 속 힐링 공간 제공을 목적으로 하였습니다.",
      "role": {
        "title": "기획",
        "items": [
          "기획: 전체 공연 기획",
          "섭외: 아티스트 및 공연 베뉴 섭외",
          "홍보: 인스타그램 계정 관리 및 홍보",
          "제작: 홍보 영상 제작, 공연 소품 준비",
          "운영: 현장 운영 및 이슈 관리"
        ]
      },
      "results": [
        "감각적 라이팅 쇼와 미디어 연출 완성도 호평 -> 인스타 해시태그 확산 및 후속 시리즈 제작 문의 폭주",
        "실험적 낭독 결합 공연의 대중성 확인 -> 비주얼 아트 티켓 판매율 기회 대비 120% 성과 달성",
        "무사고 테크니컬 쇼 및 씬 동기화 정밀 작동 -> 암전 상태의 신속 하우스 크루 가이드 안착"
      ],
      "images": [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2053.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg"
      ]
    }
  ],
  "introduction": "즐거운 일탈의 경험을 기획하는 기획자 이근일 입니다",
  "profileImage": "https://raw.githubusercontent.com/2green-lee/Portfolio/7fe5749c4d7157e49816af496d35e3466760aa25/my-notion-face-portrait.png",
  "education": {
    "name": "부산대학교",
    "period": "2013 - 2021",
    "major": "항공우주공학 & 예술문화영상학"
  },
  "certificates": [
    {
      "title": "TOEIC SPEAKING",
      "subtitle": "AL",
      "score": "AL",
      "rating": "Level 9/11",
      "ratio": 0.8181818181818182
    },
    {
      "title": "TOEIC",
      "subtitle": "830",
      "score": "830",
      "rating": "830/990",
      "ratio": 0.8383838383838383
    },
    {
      "title": "ADsP",
      "subtitle": "데이터 분석 준전문가",
      "score": "데이터 분석 준전문가"
    },
    {
      "title": "워드프로세서",
      "subtitle": "단일등급",
      "score": "단일등급"
    },
    {
      "title": "운전면허증",
      "subtitle": "1종보통",
      "score": "1종보통"
    }
  ],
  "workExperience": [
    {
      "company": "퀸즈스마일",
      "tags": "기획/운영 · 인턴/수습 · PM(프로젝트매니저)",
      "period": "2024.05 ~ 2024.10",
      "desc": [
        "국내외 페스티벌 및 공연 기획 및 운영",
        "워터밤, 펜타포트 등 대형 페스티벌 현장 운영 참여 및 실무 지원",
        "자사 플랫폼 UX/UI 개선 프로젝트 참여 (개발팀 협업)",
        "공연 및 이벤트 운영 관련 자료 정리 및 내부 공유 문서 제작",
        "고객 서비스 채널 운영 및 문의 대응 프로세스 관리"
      ]
    },
    {
      "company": "파나카노트",
      "tags": "공연 기획 및 운영 · 기획/운영 · PD",
      "period": "2022.09 ~ 2023.03",
      "desc": [
        "공연 기획 및 운영",
        "영상 및 디자인 콘텐츠 제작",
        "조명 및 음향 디렉팅 및 시스템 관리",
        "현장 통제 및 관객 가이드"
      ]
    },
    {
      "company": "드림씨어터",
      "tags": "고객서비스 · 아르바이트 · 하우스어텐던트",
      "period": "2019.10 ~ 2022.05",
      "desc": [
        "대형 라이선스 공연 관객 서비스 및 현장 운영 지원",
        "특이사항 및 현장 돌발 이슈 해결 및 대응",
        "공연장 안전 관리 및 운영 프로세스 이행"
      ]
    }
  ],
  "activities": [
    {
      "title": "광고·마케팅 동아리 CREATOR",
      "period": "2019.03 ~ 2021.02",
      "org": "부산대학교",
      "desc": [
        "영상 콘텐츠 및 카피라이팅 기획/제작",
        "마케팅 콘텐츠 기획 및 실행 경험",
        "공모전 수상"
      ],
      "images": [
        "https://github.com/2green-lee/Portfolio/blob/853a80abbfea1856ad695b5b66297915fd1bc8d7/c1.jpg",
        "https://github.com/2green-lee/Portfolio/blob/853a80abbfea1856ad695b5b66297915fd1bc8d7/c2.jpg",
        "https://github.com/2green-lee/Portfolio/blob/853a80abbfea1856ad695b5b66297915fd1bc8d7/c3.jpg",
        "https://github.com/2green-lee/Portfolio/blob/853a80abbfea1856ad695b5b66297915fd1bc8d7/c4.jpg",
        "https://github.com/2green-lee/Portfolio/blob/853a80abbfea1856ad695b5b66297915fd1bc8d7/c5.jpg",
        "https://github.com/2green-lee/Portfolio/blob/853a80abbfea1856ad695b5b66297915fd1bc8d7/c6.jpg",
        "https://github.com/2green-lee/Portfolio/blob/853a80abbfea1856ad695b5b66297915fd1bc8d7/c7.jpg",
        "https://github.com/2green-lee/Portfolio/blob/853a80abbfea1856ad695b5b66297915fd1bc8d7/c8.jpg",
        "https://github.com/2green-lee/Portfolio/blob/853a80abbfea1856ad695b5b66297915fd1bc8d7/c9.jpg",
        "https://github.com/2green-lee/Portfolio/blob/853a80abbfea1856ad695b5b66297915fd1bc8d7/c10.jpg"
      ],
      "awards": [
        {
          "title": "우수상 / HF 희망 캠페인 송 챌린지 공모전",
          "date": "2020.12.24",
          "org": "한국주택금융공사"
        },
        {
          "title": "금상 / 내가 만난 도시재생 UCC 공모전",
          "date": "2020.12.10",
          "org": "부산도시공사"
        },
        {
          "title": "우수상 / 대학혁신 창의미래 설계 <디딤돌>",
          "date": "2020.01.13",
          "org": "부산대학교"
        },
        {
          "title": "장려상 / 제 1회 한국숲사랑청소년단 영상 공모전",
          "date": "2019.10.21",
          "org": "(사) 한국 숲사랑청소년단"
        }
      ]
    },
    {
      "title": "청년 UNIVERSITY 기획자 양성 프로그램",
      "period": "2021.06 ~ 2021.12",
      "org": "부산문화재단",
      "desc": [
        "공연 기획 프로젝트 수행 (기획–운영–성과 분석 전 과정 경험)",
        "공연 <오후의 향기> 기획 및 운영",
        "프로젝트 결과 보고서 작성 및 발표"
      ]
    },
    {
      "title": "아트모아 기자단 2기",
      "period": "2022.09 ~ 2022.12",
      "org": "예술경영지원센터",
      "desc": [
        "공연 및 문화예술 업계 전문가 인터뷰 기획 및 진행",
        "산업 관련 자료 조사 및 기사 작성",
        "공연 및 페스티벌 관련 인사이트 콘텐츠 제작"
      ],
      "articles": [
        {
          "title": "문화예술콘텐츠의 기획, 제작에서 브랜딩까지\n문화콩 조은아 대표",
          "thumbnail": "https://raw.githubusercontent.com/2green-lee/Portfolio/21750c9ae31fa09d98dd7ce454cb187bf3b4c214/article%202.png",
          "url": "https://www.artmore.kr/sub/comJob/com_visit_view.do?bbs_detail_idx=564",
          "date": "2023-02-23"
        },
        {
          "title": "서로에게 선을 긋기 전에 함께 춤을 추자!\n피스트레인 뮤직 페스티벌 김미소 상임이사",
          "thumbnail": "https://raw.githubusercontent.com/2green-lee/Portfolio/21750c9ae31fa09d98dd7ce454cb187bf3b4c214/article%204.png",
          "url": "https://www.artmore.kr/sub/comJob/com_visit_view.do?bbs_detail_idx=541",
          "date": "2023-01-02"
        },
        {
          "title": "젊은 예술의 바람이 머무는 자리\n신촌문화발전소 김안나 프로그램 매니저",
          "thumbnail": "https://raw.githubusercontent.com/2green-lee/Portfolio/21750c9ae31fa09d98dd7ce454cb187bf3b4c214/article%203.png",
          "url": "https://www.artmore.kr/sub/comJob/com_visit_view.do?bbs_detail_idx=529",
          "date": "2022-12-01"
        },
        {
          "title": "일탈의 맛, 축제의 즐거움\n부산문화관광축제조직위원회 박용헌 사무처장",
          "thumbnail": "https://raw.githubusercontent.com/2green-lee/Portfolio/21750c9ae31fa09d98dd7ce454cb187bf3b4c214/article%201.png",
          "url": "https://www.artmore.kr/sub/comJob/com_visit_view.do?bbs_detail_idx=527",
          "date": "2022-12-01"
        },
        {
          "title": "지역 문화 예술 생태계의 재생과 실천\n플랜비 문화예술협동조합 송교성 실장",
          "thumbnail": "https://raw.githubusercontent.com/2green-lee/Portfolio/21750c9ae31fa09d98dd7ce454cb187bf3b4c214/article%205.png",
          "url": "https://www.artmore.kr/sub/comJob/com_visit_view.do?bbs_detail_idx=499",
          "date": "2022-10-13"
        }
      ]
    },
    {
      "title": "파나카노트 공연 기획 PD",
      "period": "2022.09 ~ 2023.03",
      "org": "복합문화공간",
      "desc": [
        "공연 기획 및 운영",
        "영상 및 디자인 콘텐츠 제작",
        "조명 및 음향 디렉팅 및 시스템 관리",
        "현장 통제 및 관객 가이드"
      ],
      "images": [
        "https://github.com/2green-lee/Portfolio/blob/26ffa60c17bb8015df09c37fc171b198dd1ec0e6/1.jpg",
        "https://github.com/2green-lee/Portfolio/blob/26ffa60c17bb8015df09c37fc171b198dd1ec0e6/2.jpg",
        "https://github.com/2green-lee/Portfolio/blob/26ffa60c17bb8015df09c37fc171b198dd1ec0e6/3.jpg",
        "https://github.com/2green-lee/Portfolio/blob/26ffa60c17bb8015df09c37fc171b198dd1ec0e6/4.jpg",
        "https://github.com/2green-lee/Portfolio/blob/26ffa60c17bb8015df09c37fc171b198dd1ec0e6/5.jpg",
        "https://github.com/2green-lee/Portfolio/blob/26ffa60c17bb8015df09c37fc171b198dd1ec0e6/6.jpg",
        "https://github.com/2green-lee/Portfolio/blob/26ffa60c17bb8015df09c37fc171b198dd1ec0e6/7.jpg",
        "https://github.com/2green-lee/Portfolio/blob/26ffa60c17bb8015df09c37fc171b198dd1ec0e6/8.jpg",
        "https://github.com/2green-lee/Portfolio/blob/26ffa60c17bb8015df09c37fc171b198dd1ec0e6/9.jpg",
        "https://github.com/2green-lee/Portfolio/blob/26ffa60c17bb8015df09c37fc171b198dd1ec0e6/10.jpg"
      ]
    },
    {
      "title": "한일청년교류회",
      "period": "2019.03 ~ 2021.02",
      "org": "부산한일문화교류협회",
      "desc": [
        "한일 대학생 교류 프로그램 기획 및 운영 참여",
        "해외 프로그램 봉사활동",
        "아름다운 청년 이수현 모임 10주년 영상 제작 및 상영"
      ],
      "images": [
        "https://github.com/2green-lee/Portfolio/blob/66da72f0fddabc7e80634c3b3f3917674ac0f72c/1.jpg",
        "https://github.com/2green-lee/Portfolio/blob/66da72f0fddabc7e80634c3b3f3917674ac0f72c/2.jpg",
        "https://github.com/2green-lee/Portfolio/blob/66da72f0fddabc7e80634c3b3f3917674ac0f72c/3.jpg",
        "https://github.com/2green-lee/Portfolio/blob/66da72f0fddabc7e80634c3b3f3917674ac0f72c/4.jpg",
        "https://github.com/2green-lee/Portfolio/blob/66da72f0fddabc7e80634c3b3f3917674ac0f72c/5.jpg",
        "https://github.com/2green-lee/Portfolio/blob/66da72f0fddabc7e80634c3b3f3917674ac0f72c/6.jpg",
        "https://github.com/2green-lee/Portfolio/blob/66da72f0fddabc7e80634c3b3f3917674ac0f72c/7.jpg",
        "https://github.com/2green-lee/Portfolio/blob/66da72f0fddabc7e80634c3b3f3917674ac0f72c/8.jpg",
        "https://github.com/2green-lee/Portfolio/blob/66da72f0fddabc7e80634c3b3f3917674ac0f72c/9.jpg",
        "https://github.com/2green-lee/Portfolio/blob/66da72f0fddabc7e80634c3b3f3917674ac0f72c/10.jpg"
      ]
    }
  ],
  "techStack": [
    {
      "label": "DESIGN",
      "items": [
        "일러스트레이터",
        "포토샵",
        "프리미어 프로"
      ]
    },
    {
      "label": "OFFICE",
      "items": [
        "Microsoft office",
        "Google Workspace"
      ]
    },
    {
      "label": "TEAM WORK",
      "items": [
        "Notion",
        "Slack",
        "Flow"
      ]
    }
  ],
  "contact": {
    "email": "lgi12@naver.com",
    "phone": "010-9335-9620",
    "instagram": "darkreen___n",
    "instagramUrl": "https://www.instagram.com/darkreen___n/",
    "location": "Seoul, South Korea"
  }
};

export const DEFAULT_FESTIVAL_TICKET = [
  {
    phase: "사전 운영",
    label: "PRE-EVENT",
    items: [
      {
        title: "티켓 발송 및 수량 관리",
        body: "모바일 스마트 티켓 발송 및 전체 수량 관리, 기획사 및 스폰서용 초대권 배분 관리"
      },
      {
        title: "고객 문의(CS) 전담 응대",
        body: "티켓 예매, 취소, 환불 등 관객들의 사전 문의 사항 직접 응대 및 처리"
      }
    ]
  },
  {
    phase: "현장 운영",
    label: "ON-SITE",
    items: [
      {
        title: "티켓 부스 총괄 및 현장 판매",
        body: "페스티벌 현장 티켓 부스 총책임자로서 부스 운영을 이끌고 현장 오프라인 발권 및 티켓 판매 진행"
      },
      {
        title: "스태프 채용 및 교육",
        body: "티켓 부스에서 일할 현장 스태프를 사전에 채용하고, 발권 시스템 사용법 및 고객 응대 방법 교육"
      },
      {
        title: "현장 이슈 직접 대응",
        body: "QR코드 인식 오류, 본인 확인 문제 등 티켓 관련 현장 이슈 및 관객 컴플레인 발생 시 직접 나서서 해결"
      }
    ]
  },
  {
    phase: "사후 관리",
    label: "POST-EVENT",
    items: [
      {
        title: "환불 및 최종 마감",
        body: "페스티벌 종료 후 미사용 티켓 환불 처리 및 티켓 관련 최종 고객 문의(CS) 해결"
      }
    ]
  }
];

export const DEFAULT_FESTIVAL_FNB = [
  {
    phase: "사전 운영",
    label: "PRE-EVENT",
    items: [
      {
        title: "푸드 업체 섭외 및 계약",
        body: "페스티벌에 입점할 푸드 업체를 섭외하고 입점 계약서 작성"
      },
      {
        title: "구청 위생과 인허가 처리",
        body: "관할 구청 위생과와 소통하여 페스티벌 기간 내 음식 판매를 위한 '한시적 영업신고' 등 임시 판매 권한 발급 진행"
      },
      {
        title: "어플 내 사전 판매 세팅",
        body: "예약 어플(퀸즈스마일) 내에 푸드 업체의 메뉴와 상품을 등록하고 사전 판매 관리"
      }
    ]
  },
  {
    phase: "현장 운영",
    label: "ON-SITE",
    items: [
      {
        title: "푸드 구역(F&B 존) 총괄",
        body: "푸드 구역 전체의 현장 이슈를 종합적으로 관리하고 통제"
      },
      {
        title: "현장 스태프 관리",
        body: "푸드 구역 담당 스태프 채용 및 교육 진행"
      },
      {
        title: "대기열 및 혼잡도 관리",
        body: "점심/저녁 등 혼잡한 시간대에 부스 대기줄 관리. 현장이 막히지 않도록 어플 내 상품 판매 상태를 켜고 끄며(On/Off) 실시간 통제"
      }
    ]
  },
  {
    phase: "사후 관리",
    label: "POST-EVENT",
    items: [
      {
        title: "환불 처리 및 정산",
        body: "행사 종료 후 음식 및 결제 관련 고객 문의(CS), 환불 처리 및 계약된 푸드 업체들과의 최종 대금 정산"
      }
    ]
  }
];

export const DEFAULT_FESTIVAL_STORAGE = [
  {
    phase: "사전 운영",
    label: "PRE-EVENT",
    items: [
      {
        title: "물류 및 장비 일정 관리",
        body: "MD 상품과 물품보관소 운영에 필요한 장비(선반, 비닐 팩 등)가 행사 기간에 맞춰 현장에 도착하도록 창고 및 물류 업체와 일정 조율"
      },
      {
        title: "어플 내 사전 판매 오픈",
        body: "예약 어플(퀸즈스마일)에 사전 구매용 MD 상품과 물품보관권을 등록하고 온라인 판매 진행"
      }
    ]
  },
  {
    phase: "현장 운영",
    label: "ON-SITE",
    items: [
      {
        title: "MD 부스 및 보관소 총괄",
        body: "MD 상품 진열, 현장 판매 및 실시간 재고 관리 진행. 수많은 짐을 보관하고 찾는 보관소 동선 관리 및 현장 돌발 이슈 대응"
      },
      {
        title: "스태프 채용 및 교육",
        body: "각 부스(MD, 물품보관소)를 담당할 스태프를 채용하고, 판매 포스(POS)기 사용법, 짐 보관 시스템 매뉴얼, 고객 응대 방법 교육"
      }
    ]
  },
  {
    phase: "사후 관리",
    label: "POST-EVENT",
    items: [
      {
        title: "고객 환불 및 문의(CS) 해결",
        body: "불량 MD 상품 교환/환불 처리 및 보관소 분실물 문의, 미사용 건에 대한 최종 고객 문의 응대"
      },
      {
        title: "재고 마감 및 최종 정산",
        body: "행사 기간 동안 판매된 MD 상품의 최종 남은 재고 대조 및 매출 마감, 보관소 운영 관련 최종 비용 정산"
      }
    ]
  }
];
