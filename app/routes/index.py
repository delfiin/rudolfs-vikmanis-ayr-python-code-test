from flask import render_template, Blueprint

index_blueprint = Blueprint(
    'index_blueprint',
    'index',
    template_folder='templates'
)


@index_blueprint.route("/")
def hello_world():
    return render_template('index.html')
