export type Review = {
  id: string;
  product: string;
  quote: {
    en: string;
    vi: string;
  };
  author: {
    en: string;
    vi: string;
  };
  role: {
    en: string;
    vi: string;
  };
};

export const reviews: Review[] = [
  {
    id: "thinh-wind",
    product: "Wind",
    quote: {
      vi: "Tôi đưa thơ của mình lên Wind, rồi dẫn học sinh vào xem như một buổi tham quan. Các em thấy thơ không chỉ nằm trên giấy.",
      en: "I put my own poetry on Wind, then bring my students in for a visit. They see that poetry does not have to live only on paper.",
    },
    author: {
      vi: "Thầy Thịnh",
      en: "Teacher Thinh",
    },
    role: {
      vi: "giáo viên Lịch sử & Ngữ văn",
      en: "History & Literature",
    },
  },
  {
    id: "hoang-minh-learning",
    product: "Learning",
    quote: {
      vi: "Mình ôn thi B1 trên Learning. Bily nhớ mình yếu phần nào và đổi bài tập theo đúng chỗ đó, nên buổi học nào cũng bắt đầu từ chỗ mình đang đứng.",
      en: "I revised for my B1 exam on Learning. Bily remembered where I was weak and changed the exercises to match, so each session started where I actually was.",
    },
    author: {
      vi: "Hoàng Minh",
      en: "Hoang Minh",
    },
    role: {
      vi: "học viên ôn thi B1",
      en: "B1 exam candidate",
    },
  },
  {
    id: "anh-khoa-learning",
    product: "Learning",
    quote: {
      vi: "Trước đây ai cũng học chung một lộ trình. Bily chia nhỏ theo đúng mục tiêu B1 của mình, nên ngày nào mình cũng biết phải làm gì.",
      en: "Everyone used to follow the same study plan. Bily broke it down around my own B1 goal, so I always knew what to do that day.",
    },
    author: {
      vi: "Anh Khoa",
      en: "Anh Khoa",
    },
    role: {
      vi: "học viên ôn thi B1",
      en: "B1 exam candidate",
    },
  },
];
