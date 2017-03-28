using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Web.Data
{
    public class Lorem
    {
        private string[] Words { get; set; }
        private Random Random { get; set; }
        public Lorem()
        {
            Random = new Random();
            string paragraph = "sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur";
            paragraph = paragraph.Replace(",", "").Replace(".", "");

            Words = paragraph.Split(' ');

        }

        public string Sentence(int min, int max)
        {
            var sentence = string.Empty;

            for (int i = min; i < max; i++)
            {
                var word = Word();
                if (i == min)
                {
                    word = word.First().ToString().ToUpper() + word.Substring(1);
                }
                sentence += $"{word} ";
            }
            return $"{sentence.TrimEnd(' ')}. ";
        }

        public string Word()
        {
            return Words[Random.Next(0, Words.Length)];
        }

        public string Paragraph(int min, int max)
        {
            string paragraph = string.Empty;
            var sentenceCount = Random.Next(min, max);
            for (int i = 0; i < sentenceCount; i++)
            {
                paragraph += Sentence(5, 10); 
            }

            return paragraph;
        }
    }
}
