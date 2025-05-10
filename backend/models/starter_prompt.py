from app import db
from datetime import datetime

class StarterPrompt(db.Model):
    __tablename__ = 'starter_prompts'
    
    id = db.Column(db.Integer, primary_key=True)
    prompt = db.Column(db.String(128), nullable=False)
    illustration_path = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'prompt': self.prompt,
            'illustration': self.illustration_path
        } 