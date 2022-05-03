import classes from "./Companies.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const companies = [
  {
    id: "1",
    name: "burgerking",
    image:
      "https://lchilltopnews.org/wp-content/uploads/2021/04/vw9dwa2fbgqzdmkizszx.png",
    link: "https://careers.bk.com/",
  },
  {
    id: "2",
    name: "chipotle",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGMp1_nThLLrM65hvD_mYb56zM1pdB-AidBmU9GKgQOSUOPT11X2QkjFHELs1TuIPuzmg&usqp=CAU",
    link: "https://jobs.chipotle.com/",
  },
  {
    id: "3",
    name: "mcdonalds",
    image:
      "https://apksshare.com/wp-content/uploads/2021/06/McDonalds-APK-MOD-Download-2.21.0.png",
    link: "https://careers.mcdonalds.com/main/jobs",
  },
  {
    id: "4",
    name: "innout",
    image:
      "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0011/2792/brand.gif?itok=BErnVPeA",
    link: "https://www.in-n-out.com/employment",
  },
  {
    id: "5",
    name: "wendys",
    image: "https://assets.simon.com/tenantlogos/6568.png",
    link: "https://wendys-careers.com/",
  },
  {
    id: "6",
    name: "tacobell",
    image: "https://logowiki.net/uploads/logo/t/taco-bell-5.svg",
    link: "https://jobs.tacobell.com/?s_cid=GOGADjf646&gclid=CjwKCAjwrqqSBhBbEiwAlQeqGvbEW2bGIop506a5ohJ7Q2mKrynuTbNRNSPjUp8SuWWGdTBTeI0ZshoCph8QAvD_BwE",
  },
  {
    id: "8",
    name: "uniqlo",
    image: "https://logowik.com/content/uploads/images/uniqlo2627.jpg",
    link: "https://www.fastretailing.com/employment/en/uniqlo/",
  },
  {
    id: "9",
    name: "target",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6gj6ruykgfJnTQ0Mp-cQo9tuXXuzuy996tysFTBGOTBjYr6g--vbvWWOfnGfqxWzO-54&usqp=CAU",
    link: "https://jobs.target.com/search-jobs?source=google_paidsearch&utm_source=google.com&utm_medium=paid_search&utm_campaign=Corporate&utm_content=search_engine&utm_term=326951317&ss=paid&dclid=CO3l2oWu-_YCFRLHWwodToMKRA",
  },
];

const links = [
  "https://careers.bk.com/",
  "https://jobs.chipotle.com/",
  "https://careers.mcdonalds.com/main/jobs",
  "https://www.in-n-out.com/employment",
  "https://wendys-careers.com/",
  "https://jobs.tacobell.com/?s_cid=GOGADjf646&gclid=CjwKCAjwrqqSBhBbEiwAlQeqGvbEW2bGIop506a5ohJ7Q2mKrynuTbNRNSPjUp8SuWWGdTBTeI0ZshoCph8QAvD_BwE",
  "https://www.fastretailing.com/employment/en/uniqlo/",
  "https://jobs.target.com/search-jobs?source=google_paidsearch&utm_source=google.com&utm_medium=paid_search&utm_campaign=Corporate&utm_content=search_engine&utm_term=326951317&ss=paid&dclid=CO3l2oWu-_YCFRLHWwodToMKRA",
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1200, min: 1000 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 1000, min: 0 },
    items: 2,
  },
};

const Companies = () => {
  return (
    <div className={classes.wrapper}>
      <Carousel
        responsive={responsive}
        autoPlay
        infinite
        autoPlaySpeed={2000}
        className={classes.container}
      >
        {companies.map((company, i) => (
          <div key={i}>
            <a href={company.link}>
              <img src={company.image} className={classes.cardImg} />
            </a>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Companies;
