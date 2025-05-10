import click
from flask.cli import with_appcontext
from . import db
from .models.starter_prompt import StarterPrompt

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Initialize the database by creating all tables."""
    db.create_all()
    click.echo('Initialized the database.')

@click.command('seed-prompts')
@with_appcontext
def seed_prompts_command():
    """Seed the database with sample starter prompts."""
    prompts_data = [
        {
            'prompt': 'A curious cat discovers a hidden portal in an old library book, leading to a world of talking animals.',
            'illustration_path': '/assets/illustrations/cat_portal.webp'
        },
        {
            'prompt': 'An astronaut stranded on Mars finds a mysterious glowing plant that communicates through empathic visions.',
            'illustration_path': '/assets/illustrations/mars_plant.webp'
        },
        {
            'prompt': 'In a city powered by music, a young street performer finds a legendary instrument that can heal sadness.',
            'illustration_path': '/assets/illustrations/music_city.webp'
        },
        {
            'prompt': 'A child befriends a gentle robot that fell from the sky, and they embark on a quest to find its home.',
            'illustration_path': '/assets/illustrations/robot_friend.webp'
        },
        {
            'prompt': 'Deep in an enchanted forest, a baker creates magical pastries that grant temporary wishes to those who eat them.',
            'illustration_path': '/assets/illustrations/magical_pastries.webp'
        }
    ]
    
    existing_prompts = StarterPrompt.query.count()
    if existing_prompts > 0:
        click.echo('Starter prompts already exist. Skipping seeding.')
        return

    for data in prompts_data:
        prompt = StarterPrompt(prompt=data['prompt'], illustration_path=data['illustration_path'])
        db.session.add(prompt)
    
    try:
        db.session.commit()
        click.echo(f'Successfully seeded {len(prompts_data)} starter prompts.')
    except Exception as e:
        db.session.rollback()
        click.echo(f'Error seeding starter prompts: {str(e)}') 