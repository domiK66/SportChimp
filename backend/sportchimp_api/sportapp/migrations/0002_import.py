from django.db import migrations

sports = [
    ("Icehockey", "Ice hockey is a contact winter team sport played on ice skates, usually on an ice skating rink with lines and markings specific to the sport. It is one of the fastest team sports on ice belonging to a small group of four ice skating team sports, irrespective of their associated variants, which now includes bandy, ringette, and rinkball. In ice hockey, two opposing teams use ice hockey sticks to control, advance and shoot a closed, vulcanized, rubber disc called a puck into the other team's goal. Each goal is worth one point. The team which scores the most goals is declared the winner. In a formal game, each team has six skaters on the ice at a time, barring any penalties, one of whom is the goaltender."),
    ("Field hockey", "Field hockey is a team sport of the hockey family. Each team plays with ten field players and a goalkeeper, and must carry a round, hard, plastic hockey ball with a hockey stick to the rival goal. "),
    ("Skateboarding", "Skateboarding is an action sport originating in the United States that involves riding and performing tricks using a skateboard, as well as a recreational activity, an art form, an entertainment industry job, and a method of transportation."),
    ("Tennis", "Tennis is a racket sport that can be played individually against a single opponent (singles) or between two teams of two players each (doubles). Each player uses a tennis racket that is strung with cord to strike a hollow rubber ball covered with felt over or around a net and into the opponent's court. The object of the game is to manoeuvre the ball in such a way that the opponent is not able to play a valid return. The player who is unable to return the ball validly will not gain a point, while the opposite player will."),
    ("Tabletennis", "Table tennis, also known as ping-pong and whiff-whaff, is a sport in which two or four players hit a lightweight ball, also known as the ping-pong ball, back and forth across a table using small rackets. The game takes place on a hard table divided by a net. Except for the initial serve, the rules are generally as follows: players must allow a ball played toward them to bounce once on their side of the table and must return it so that it bounces on the opposite side at least once. A point is scored when a player fails to return the ball within the rules. Play is fast and demands quick reactions. Spinning the ball alters its trajectory and limits an opponent's options, giving the hitter a great advantage."),
    ("Football", "Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal. Unqualified, the word football normally means the form of football that is the most popular where the word is used. Sports commonly called football include association football (known as soccer in North America and Oceania); gridiron football (specifically American football or Canadian football); Australian rules football; rugby union and rugby league; and Gaelic football." ),
    ("Association football (Soccer)", "Association football, more commonly known as simply football or soccer,[a] is a team sport played with a spherical ball between two teams of 11 players. It is played by approximately 250 million players in over 200 countries and dependencies, making it the world's most popular sport. The game is played on a rectangular field called a pitch with a goal at each end. The object of the game is to score more goals than the opposition by moving the ball beyond the goal line into the opposing goal, usually within a time frame of 90 or more minutes"),
    ("Running", "Running is a method of terrestrial locomotion allowing humans and other animals to move rapidly on foot. Running is a type of gait characterized by an aerial phase in which all feet are above the ground (though there are exceptions).[1] This is in contrast to walking, where one foot is always in contact with the ground, the legs are kept mostly straight and the center of gravity vaults over the stance leg or legs in an inverted pendulum fashion.")
]


def import_data(apps, schema_editor):
    Sport = apps.get_model('sportapp', 'Sport')
    [Sport.objects.create(name = name,description = description) for name, description in sports]
    

class Migration(migrations.Migration):
    dependencies = [
        ('sportapp', '0001_initial')
    ]
    operations = [
        migrations.RunPython(import_data)
    ]
