const SNIPPETS = {
  decision: { label: "Che problema è?", icon: "🧭", items: [] },

  // ── IMPORT ────────────────────────────────────────────────────────────────
  imports: {
    label: "Import",
    icon: "📦",
    items: [
      {
        title: "Import Base",
        tag: "base", tagColor: "blue",
        when: "All'inizio di ogni notebook ML — importa una volta sola",
        code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')

pd.set_option('display.max_columns', None)
pd.set_option('display.float_format', lambda x: '%.3f' % x)
sns.set_theme(style='darkgrid')
%matplotlib inline`
      },
      {
        title: "Import Classificazione",
        tag: "classificazione", tagColor: "green",
        when: "Se il target è categorico (classi, etichette)",
        code: `from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import GradientBoostingClassifier`
      },
      {
        title: "Import Regressione",
        tag: "regressione", tagColor: "orange",
        when: "Se il target è numerico continuo",
        code: `from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.tree import DecisionTreeRegressor
from sklearn.neighbors import KNeighborsRegressor`
      },
      {
        title: "Import Metriche Classificazione",
        tag: "metriche", tagColor: "yellow",
        when: "Per valutare un modello di classificazione",
        code: `from sklearn.metrics import (
    accuracy_score,
    f1_score,
    precision_score,
    recall_score,
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay,
    roc_auc_score,
    roc_curve
)`
      },
      {
        title: "Import Metriche Regressione",
        tag: "metriche", tagColor: "yellow",
        when: "Per valutare un modello di regressione",
        code: `from sklearn.metrics import (
    mean_squared_error,
    mean_absolute_error,
    r2_score,
    mean_absolute_percentage_error
)`
      },
      {
        title: "Import Preprocessing",
        tag: "preprocessing", tagColor: "purple",
        when: "Prima di qualsiasi preprocessing o split dei dati",
        code: `from sklearn.preprocessing import (
    StandardScaler,
    MinMaxScaler,
    LabelEncoder,
    OneHotEncoder,
    RobustScaler
)
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
import pandas as pd`
      }
    ]
  },

  // ── EDA ───────────────────────────────────────────────────────────────────
  eda: {
    label: "EDA",
    icon: "🔍",
    items: [
      {
        title: "Carica e ispeziona dataset",
        tag: "EDA", tagColor: "blue",
        when: "Primo passo — carica i dati e vedi struttura e dimensioni",
        code: `# TODO: sostituisci con il percorso reale del file
df = pd.read_csv('dataset.csv')

print('Shape:', df.shape)
print('\\nPrime righe:')
df.head()`
      },
      {
        title: "Info e tipi di dato",
        tag: "EDA", tagColor: "blue",
        when: "Per capire tipi di colonne e trovare colonne object da encodare",
        code: `df.info()
print('\\nTipi di dato:')
print(df.dtypes)
print('\\nValori unici per colonna:')
print(df.nunique())`
      },
      {
        title: "Rilevamento automatico colonne",
        tag: "EDA", tagColor: "blue",
        when: "Per separare subito numeriche da categoriche prima del preprocessing",
        code: `num_cols  = df.select_dtypes(include=['number']).columns.tolist()
cat_cols  = df.select_dtypes(include=['object', 'category']).columns.tolist()
bool_cols = df.select_dtypes(include='bool').columns.tolist()

print(f'Numeriche   ({len(num_cols)}):  {num_cols}')
print(f'Categoriche ({len(cat_cols)}): {cat_cols}')
print(f'Booleane    ({len(bool_cols)}): {bool_cols}')

# Cardinalità delle categoriche (utile per scegliere encoding)
for c in cat_cols:
    print(f'  {c}: {df[c].nunique()} valori unici')`
      },
      {
        title: "Statistiche descrittive",
        tag: "EDA", tagColor: "blue",
        when: "Per overview di media, std, min, max, percentili",
        code: `# Variabili numeriche
print('Statistiche numeriche:')
df.describe()

# Variabili categoriche
print('\\nStatistiche categoriche:')
df.describe(include='object')`
      },
      {
        title: "Valori nulli",
        tag: "EDA", tagColor: "yellow",
        when: "Per sapere dove intervenire con imputer o drop",
        code: `null_counts = df.isnull().sum()
null_pct    = (df.isnull().sum() / len(df) * 100).round(2)

null_df = pd.DataFrame({'count': null_counts, 'percentage': null_pct})
print(null_df[null_df['count'] > 0].sort_values('percentage', ascending=False))`
      },
      {
        title: "Value counts (variabile categorica)",
        tag: "EDA", tagColor: "blue",
        when: "Per vedere distribuzione di una colonna categorica o del target",
        code: `# TODO: sostituisci 'colonna' con il nome della colonna
colonna = 'target'  # TODO

print(df[colonna].value_counts())
print('\\nProporzioni:')
print(df[colonna].value_counts(normalize=True).round(3))`
      },
      {
        title: "Correlazione numerica",
        tag: "EDA", tagColor: "blue",
        when: "Per capire quali feature sono legate al target numerico",
        code: `corr = df.select_dtypes(include='number').corr()

# TODO: sostituisci 'target' con il nome della colonna target
target = 'target'  # TODO
print('Correlazione con', target)
print(corr[target].sort_values(ascending=False))`
      },
      {
        title: "Duplicati e sanity check",
        tag: "EDA", tagColor: "yellow",
        when: "Per dati puliti prima del preprocessing",
        code: `print('Duplicati:', df.duplicated().sum())
df = df.drop_duplicates()
print('Shape dopo rimozione duplicati:', df.shape)

import numpy as np
print('\\nValori infiniti:')
print(np.isinf(df.select_dtypes(include='number')).sum())`
      },
      {
        title: "Outlier — metodo IQR",
        tag: "outlier", tagColor: "yellow",
        when: "Per rilevare e rimuovere outlier statistici — metodo robusto",
        code: `# TODO: scegli la colonna da analizzare
col = 'colonna'  # TODO

Q1  = df[col].quantile(0.25)
Q3  = df[col].quantile(0.75)
IQR = Q3 - Q1

lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

outliers = df[(df[col] < lower) | (df[col] > upper)]
print(f'Outlier in {col}: {len(outliers)} ({len(outliers)/len(df)*100:.1f}%)')
print(f'  range valido: [{lower:.2f}, {upper:.2f}]')

# Rimozione opzionale
df_clean = df[(df[col] >= lower) & (df[col] <= upper)]
print(f'Shape prima: {df.shape}, dopo: {df_clean.shape}')

# Per tutte le colonne numeriche in blocco
num_cols = df.select_dtypes(include='number').columns
mask = pd.Series([True] * len(df), index=df.index)
for c in num_cols:
    q1, q3 = df[c].quantile(0.25), df[c].quantile(0.75)
    iqr = q3 - q1
    mask &= (df[c] >= q1 - 1.5*iqr) & (df[c] <= q3 + 1.5*iqr)
df_no_out = df[mask]
print(f'Righe rimosse (IQR, tutte colonne): {len(df) - len(df_no_out)}')`
      },
      {
        title: "Outlier — z-score",
        tag: "outlier", tagColor: "yellow",
        when: "Alternativa all'IQR — assume distribuzione approssimativamente normale",
        code: `from scipy import stats
import numpy as np

num_cols  = df.select_dtypes(include='number').columns
z_scores  = np.abs(stats.zscore(df[num_cols].dropna()))
threshold = 3  # soglia standard: |z| > 3 = outlier

# Righe senza outlier (tutte le colonne entro soglia)
mask     = (z_scores < threshold).all(axis=1)
df_clean = df[mask]
print(f'Outlier rimossi: {len(df) - len(df_clean)} righe')
print(f'Shape prima: {df.shape}, dopo: {df_clean.shape}')

# Per colonna singola
col = 'colonna'  # TODO
z = np.abs(stats.zscore(df[col].dropna()))
print(f'Outlier in {col} (|z|>3): {(z > 3).sum()}')`
      },
      {
        title: "Encoding del target y (LabelEncoder)",
        tag: "encoding", tagColor: "purple",
        when: "Se y è stringa — sklearn richiede y numerico per quasi tutti i modelli",
        code: `from sklearn.preprocessing import LabelEncoder

# Controlla prima se y è già numerico
print('Tipo y:', y.dtype)
print('Valori unici:', y.unique())

# Applica solo se y è stringa (es. 'spam'/'ham', 'cat'/'dog')
le_y = LabelEncoder()
y_enc = le_y.fit_transform(y)

print('Mappatura:', dict(zip(le_y.classes_, le_y.transform(le_y.classes_))))
# Per invertire le predizioni: le_y.inverse_transform(y_pred)`
      },
      {
        title: "Drop colonne inutili",
        tag: "EDA", tagColor: "yellow",
        when: "Prima del preprocessing — rimuovi rumore che non aiuta il modello",
        code: `# 1. Colonne con troppi null (>50%)
thresh    = 0.5
null_pct  = df.isnull().mean()
cols_null = null_pct[null_pct > thresh].index.tolist()
print(f'Colonne con >{thresh*100:.0f}% null: {cols_null}')

# 2. Colonne ID-like (alta cardinalità, probabilmente inutili)
id_cols = [c for c in df.columns if c.lower() in ['id', 'index', 'unnamed: 0']]

# 3. Colonne costanti (varianza zero)
zero_var = [c for c in df.select_dtypes(include='number').columns
            if df[c].std() == 0]

cols_to_drop = list(set(cols_null + id_cols + zero_var))
df = df.drop(columns=cols_to_drop, errors='ignore')
print(f'Colonne rimosse ({len(cols_to_drop)}): {cols_to_drop}')
print(f'Shape finale: {df.shape}')`
      }
    ]
  },

  // ── PREPROCESSING ─────────────────────────────────────────────────────────
  preprocessing: {
    label: "Preprocessing",
    icon: "⚙️",
    items: [
      {
        title: "Train/Test Split",
        tag: "split", tagColor: "blue",
        when: "Sempre, prima di qualsiasi fit — split all'80/20",
        code: `# TODO: definisci le feature e il target
target   = 'target'  # TODO: nome colonna target
features = df.drop(columns=[target]).columns.tolist()

X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y   # rimuovi se regressione
)

print(f'Train: {X_train.shape}, Test: {X_test.shape}')`
      },
      {
        title: "Imputer — Nulli Numerici (mean/median)",
        tag: "imputer", tagColor: "purple",
        when: "Se df.isnull().sum() mostra null in colonne numeriche",
        code: `from sklearn.impute import SimpleImputer

num_cols = X_train.select_dtypes(include='number').columns.tolist()

imputer_num = SimpleImputer(strategy='median')  # oppure 'mean'
X_train[num_cols] = imputer_num.fit_transform(X_train[num_cols])
X_test[num_cols]  = imputer_num.transform(X_test[num_cols])`
      },
      {
        title: "Imputer — Nulli Categorici (most_frequent)",
        tag: "imputer", tagColor: "purple",
        when: "Se df.isnull().sum() mostra null in colonne object",
        code: `from sklearn.impute import SimpleImputer

cat_cols = X_train.select_dtypes(include='object').columns.tolist()

imputer_cat = SimpleImputer(strategy='most_frequent')
X_train[cat_cols] = imputer_cat.fit_transform(X_train[cat_cols])
X_test[cat_cols]  = imputer_cat.transform(X_test[cat_cols])`
      },
      {
        title: "Encoding — LabelEncoder (binario)",
        tag: "encoding", tagColor: "purple",
        when: "Per variabili binarie (2 valori) o per encodare il target y",
        code: `from sklearn.preprocessing import LabelEncoder

# Usa per colonne binarie (es. Sì/No, M/F)
# TODO: sostituisci 'colonna_binaria' con il nome reale
le = LabelEncoder()
X_train['colonna_binaria'] = le.fit_transform(X_train['colonna_binaria'])  # TODO
X_test['colonna_binaria']  = le.transform(X_test['colonna_binaria'])       # TODO

print('Classi:', le.classes_)`
      },
      {
        title: "Encoding — get_dummies / OneHot (multiclasse)",
        tag: "encoding", tagColor: "purple",
        when: "Per encodare variabili categoriche in modo rapido (pandas)",
        code: `# TODO: lista colonne categoriche da encodare
cat_cols = ['col1', 'col2']  # TODO

X_train = pd.get_dummies(X_train, columns=cat_cols, drop_first=True)
X_test  = pd.get_dummies(X_test,  columns=cat_cols, drop_first=True)

# Allinea colonne (rimuove colonne extra nel test)
X_test = X_test.reindex(columns=X_train.columns, fill_value=0)
print('Shape dopo encoding:', X_train.shape)`
      },
      {
        title: "Encoding — OneHotEncoder (sklearn)",
        tag: "encoding", tagColor: "purple",
        when: "Per encodare in una pipeline sklearn — più robusto di get_dummies",
        code: `from sklearn.preprocessing import OneHotEncoder
import pandas as pd

cat_cols = ['col1', 'col2']  # TODO

ohe = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
enc_train = ohe.fit_transform(X_train[cat_cols])
enc_test  = ohe.transform(X_test[cat_cols])

enc_df_train = pd.DataFrame(enc_train, columns=ohe.get_feature_names_out(cat_cols), index=X_train.index)
enc_df_test  = pd.DataFrame(enc_test,  columns=ohe.get_feature_names_out(cat_cols), index=X_test.index)

X_train = pd.concat([X_train.drop(columns=cat_cols), enc_df_train], axis=1)
X_test  = pd.concat([X_test.drop(columns=cat_cols),  enc_df_test],  axis=1)`
      },
      {
        title: "Scaling — StandardScaler",
        tag: "scaling", tagColor: "purple",
        when: "Obbligatorio per SVM, KNN, LogisticRegression, reti neurali",
        code: `from sklearn.preprocessing import StandardScaler

num_cols = X_train.select_dtypes(include='number').columns.tolist()

scaler = StandardScaler()
X_train[num_cols] = scaler.fit_transform(X_train[num_cols])
X_test[num_cols]  = scaler.transform(X_test[num_cols])

print('Media (train):', X_train[num_cols].mean().round(3))
print('Std  (train):', X_train[num_cols].std().round(3))`
      },
      {
        title: "Scaling — MinMaxScaler",
        tag: "scaling", tagColor: "purple",
        when: "Alternativa a StandardScaler — scala in [0,1], utile con valori positivi",
        code: `from sklearn.preprocessing import MinMaxScaler

# Normalizza in [0, 1] — utile per KNN, SVM, reti neurali
num_cols = X_train.select_dtypes(include='number').columns.tolist()

scaler = MinMaxScaler()
X_train[num_cols] = scaler.fit_transform(X_train[num_cols])
X_test[num_cols]  = scaler.transform(X_test[num_cols])`
      },
      {
        title: "Feature Selection — SelectKBest (classificazione)",
        tag: "feature selection", tagColor: "purple",
        when: "Per ridurre dimensionalità in classificazione — scegli le k feature più informative",
        code: `from sklearn.feature_selection import SelectKBest, f_classif

# f_classif: ANOVA F-test per feature numeriche
# chi2: solo per feature non negative (count, freq)
k = 10  # TODO: numero di feature da tenere

selector = SelectKBest(score_func=f_classif, k=k)
X_train_sel = selector.fit_transform(X_train, y_train)
X_test_sel  = selector.transform(X_test)

selected_features = X_train.columns[selector.get_support()].tolist()
print(f'Feature selezionate ({k}): {selected_features}')

scores = pd.Series(selector.scores_, index=X_train.columns)
print(scores.sort_values(ascending=False))`
      },
      {
        title: "Feature Selection — SelectKBest (regressione)",
        tag: "feature selection", tagColor: "purple",
        when: "Per ridurre dimensionalità in regressione — scegli le k feature più correlate",
        code: `from sklearn.feature_selection import SelectKBest, f_regression

k = 10  # TODO: numero di feature da tenere

selector = SelectKBest(score_func=f_regression, k=k)
X_train_sel = selector.fit_transform(X_train, y_train)
X_test_sel  = selector.transform(X_test)

selected_features = X_train.columns[selector.get_support()].tolist()
print(f'Feature selezionate ({k}): {selected_features}')

scores = pd.Series(selector.scores_, index=X_train.columns)
print(scores.sort_values(ascending=False))`
      },
      {
        title: "Feature Selection — correlazione col target",
        tag: "feature selection", tagColor: "purple",
        when: "Metodo rapido per target numerico — elimina feature poco correlate",
        code: `# TODO: imposta soglia e nome colonna target
threshold = 0.1   # soglia minima di correlazione assoluta col target
target    = 'target'  # TODO

corr_target = df.select_dtypes(include='number').corr()[target].abs()
selected    = corr_target[corr_target >= threshold].drop(target).index.tolist()

print(f'Feature con |corr| >= {threshold}: {len(selected)}')
print(corr_target.sort_values(ascending=False))

# Applica selezione al dataset splittato
X_train = X_train[selected]
X_test  = X_test[selected]
print(f'Shape dopo selezione: {X_train.shape}')`
      },
      {
        title: "Pipeline Completa (Preprocessor)",
        tag: "pipeline", tagColor: "purple",
        when: "Per preprocessing riproducibile e senza data leakage",
        code: `from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

num_features = ['col_num1', 'col_num2']  # TODO
cat_features = ['col_cat1', 'col_cat2']  # TODO

num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

cat_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('ohe', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

preprocessor = ColumnTransformer([
    ('num', num_pipeline, num_features),
    ('cat', cat_pipeline, cat_features)
])

# Poi usa: Pipeline([('prep', preprocessor), ('model', modello)])`
      }
    ]
  },

  // ── CLASSIFICAZIONE ───────────────────────────────────────────────────────
  classification: {
    label: "Classificazione",
    icon: "🏷️",
    items: [
      {
        title: "Logistic Regression",
        tag: "logistic", tagColor: "green",
        when: "Baseline per classificazione — sempre il primo da provare",
        code: `from sklearn.linear_model import LogisticRegression

lr = LogisticRegression(
    C=1.0,        # inverso della regolarizzazione (↑C = meno regolazione)
    max_iter=1000,
    random_state=42
)
lr.fit(X_train, y_train)

y_pred = lr.predict(X_test)
y_prob = lr.predict_proba(X_test)[:, 1]  # probabilità classe positiva

print('Accuracy:', accuracy_score(y_test, y_pred).round(4))`
      },
      {
        title: "Random Forest Classifier",
        tag: "ensemble", tagColor: "green",
        when: "Buon default non-lineare — robusto, non richiede scaling",
        code: `from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(
    n_estimators=100,
    max_depth=None,
    min_samples_split=2,
    random_state=42,
    n_jobs=-1
)
rf.fit(X_train, y_train)

y_pred = rf.predict(X_test)
print('Accuracy:', accuracy_score(y_test, y_pred).round(4))

feat_imp = pd.Series(rf.feature_importances_, index=X_train.columns)
print(feat_imp.sort_values(ascending=False).head(10))`
      },
      {
        title: "SVM Classifier (SVC)",
        tag: "svm", tagColor: "green",
        when: "Dataset medi, feature scalate, margini chiari tra classi",
        code: `from sklearn.svm import SVC

svc = SVC(
    kernel='rbf',    # 'linear', 'poly', 'rbf', 'sigmoid'
    C=1.0,
    gamma='scale',
    probability=True,  # necessario per predict_proba
    random_state=42
)
svc.fit(X_train, y_train)

y_pred = svc.predict(X_test)
print('Accuracy:', accuracy_score(y_test, y_pred).round(4))`
      },
      {
        title: "K-Nearest Neighbors (KNN)",
        tag: "knn", tagColor: "green",
        when: "Dataset piccoli — richiede scaling e scelta di k",
        code: `from sklearn.neighbors import KNeighborsClassifier

knn = KNeighborsClassifier(
    n_neighbors=5,     # TODO: prova 3, 5, 7, 11
    metric='minkowski',
    weights='uniform'
)
knn.fit(X_train, y_train)

y_pred = knn.predict(X_test)
print('Accuracy:', accuracy_score(y_test, y_pred).round(4))

# Trova il k ottimale
errors = []
for k in range(1, 21):
    knn_k = KNeighborsClassifier(n_neighbors=k)
    knn_k.fit(X_train, y_train)
    errors.append(1 - accuracy_score(y_test, knn_k.predict(X_test)))
print('Miglior k:', errors.index(min(errors)) + 1)`
      },
      {
        title: "Decision Tree Classifier",
        tag: "tree", tagColor: "green",
        when: "Quando vuoi un modello visivamente interpretabile",
        code: `from sklearn.tree import DecisionTreeClassifier

dt = DecisionTreeClassifier(
    max_depth=5,
    min_samples_leaf=1,
    criterion='gini',  # 'entropy' per information gain
    random_state=42
)
dt.fit(X_train, y_train)

y_pred = dt.predict(X_test)
print('Accuracy:', accuracy_score(y_test, y_pred).round(4))

# Profondità ottimale con cross-validation
from sklearn.model_selection import cross_val_score
for depth in [3, 5, 7, 10, None]:
    dt_d = DecisionTreeClassifier(max_depth=depth, random_state=42)
    cv_score = cross_val_score(dt_d, X_train, y_train, cv=5, scoring='accuracy').mean()
    print(f'  depth={depth}: CV Acc = {cv_score:.4f}')`
      },
      {
        title: "Confronto modelli classificazione",
        tag: "confronto", tagColor: "blue",
        when: "Per scegliere il miglior algoritmo prima del tuning",
        code: `from sklearn.model_selection import cross_val_score

models = {
    'Logistic Regression': LogisticRegression(max_iter=1000, random_state=42),
    'Random Forest':       RandomForestClassifier(n_estimators=100, random_state=42),
    'SVC':                 SVC(probability=True, random_state=42),
    'KNN':                 KNeighborsClassifier(n_neighbors=5),
    'Decision Tree':       DecisionTreeClassifier(random_state=42),
}

results = {}
for name, model in models.items():
    scores = cross_val_score(model, X_train, y_train, cv=5, scoring='f1_weighted')
    results[name] = {'mean': scores.mean(), 'std': scores.std()}
    print(f'{name:25s} F1={scores.mean():.4f} ± {scores.std():.4f}')

best = max(results, key=lambda k: results[k]['mean'])
print(f'\\nMiglior modello: {best}')`
      },
      {
        title: "GridSearchCV (tuning iperparametri)",
        tag: "tuning", tagColor: "yellow",
        when: "Dopo aver scelto il modello migliore, per ottimizzare gli iperparametri",
        code: `from sklearn.model_selection import GridSearchCV

model = RandomForestClassifier(random_state=42)

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth':    [3, 5, None],
    'min_samples_split': [2, 5]
}

grid_search = GridSearchCV(
    model, param_grid,
    cv=5,
    scoring='f1_weighted',
    n_jobs=-1,
    verbose=1
)
grid_search.fit(X_train, y_train)

print('Migliori parametri:', grid_search.best_params_)
print('Miglior score CV:', grid_search.best_score_.round(4))

best_model = grid_search.best_estimator_
y_pred = best_model.predict(X_test)`
      }
    ]
  },

  // ── REGRESSIONE ───────────────────────────────────────────────────────────
  regression: {
    label: "Regressione",
    icon: "📈",
    items: [
      {
        title: "Linear Regression",
        tag: "lineare", tagColor: "orange",
        when: "Baseline — prima di provare modelli più complessi",
        code: `from sklearn.linear_model import LinearRegression

lr = LinearRegression()
lr.fit(X_train, y_train)

y_pred = lr.predict(X_test)

print('R²:  ', r2_score(y_test, y_pred).round(4))
print('MAE: ', mean_absolute_error(y_test, y_pred).round(4))
print('RMSE:', np.sqrt(mean_squared_error(y_test, y_pred)).round(4))

coef_df = pd.DataFrame({
    'feature': X_train.columns,
    'coeff':   lr.coef_
}).sort_values('coeff', key=abs, ascending=False)
print(coef_df)`
      },
      {
        title: "Ridge Regression (L2)",
        tag: "ridge", tagColor: "orange",
        when: "Con multicollinearità tra feature o molte feature irrilevanti",
        code: `from sklearn.linear_model import Ridge, RidgeCV
import numpy as np

alphas   = np.logspace(-3, 3, 50)
ridge_cv = RidgeCV(alphas=alphas, cv=5)
ridge_cv.fit(X_train, y_train)
print('Miglior alpha:', ridge_cv.alpha_)

ridge = Ridge(alpha=ridge_cv.alpha_)
ridge.fit(X_train, y_train)
y_pred = ridge.predict(X_test)

print('R²:  ', r2_score(y_test, y_pred).round(4))
print('RMSE:', np.sqrt(mean_squared_error(y_test, y_pred)).round(4))`
      },
      {
        title: "Lasso Regression (L1)",
        tag: "lasso", tagColor: "orange",
        when: "Per feature selection automatica — coefficienti azzerati",
        code: `from sklearn.linear_model import Lasso, LassoCV
import numpy as np

lasso_cv = LassoCV(cv=5, max_iter=10000, random_state=42)
lasso_cv.fit(X_train, y_train)
print('Miglior alpha:', lasso_cv.alpha_)

lasso = Lasso(alpha=lasso_cv.alpha_, max_iter=10000)
lasso.fit(X_train, y_train)
y_pred = lasso.predict(X_test)

selected = pd.Series(lasso.coef_, index=X_train.columns)
print('Feature non zero:', (selected != 0).sum())
print(selected[selected != 0].sort_values(key=abs, ascending=False))

print('R²:  ', r2_score(y_test, y_pred).round(4))`
      },
      {
        title: "Random Forest Regressor",
        tag: "ensemble", tagColor: "orange",
        when: "Relazioni non lineari — non richiede scaling, robusto agli outlier",
        code: `from sklearn.ensemble import RandomForestRegressor

rf = RandomForestRegressor(
    n_estimators=100,
    max_depth=None,
    random_state=42,
    n_jobs=-1
)
rf.fit(X_train, y_train)

y_pred = rf.predict(X_test)

print('R²:  ', r2_score(y_test, y_pred).round(4))
print('RMSE:', np.sqrt(mean_squared_error(y_test, y_pred)).round(4))

feat_imp = pd.Series(rf.feature_importances_, index=X_train.columns)
print('\\nTop 10 feature:')
print(feat_imp.sort_values(ascending=False).head(10))`
      },
      {
        title: "SVR (Support Vector Regression)",
        tag: "svr", tagColor: "orange",
        when: "Con outlier e relazioni non lineari — richiede scaling obbligatorio",
        code: `from sklearn.svm import SVR

svr = SVR(
    kernel='rbf',   # 'linear', 'poly', 'rbf'
    C=1.0,
    epsilon=0.1,
    gamma='scale'
)
svr.fit(X_train, y_train)

y_pred = svr.predict(X_test)

print('R²:  ', r2_score(y_test, y_pred).round(4))
print('RMSE:', np.sqrt(mean_squared_error(y_test, y_pred)).round(4))`
      },
      {
        title: "Confronto modelli regressione",
        tag: "confronto", tagColor: "blue",
        when: "Per scegliere il miglior regressore",
        code: `from sklearn.model_selection import cross_val_score

models = {
    'Linear Regression': LinearRegression(),
    'Ridge':             Ridge(alpha=1.0),
    'Lasso':             Lasso(alpha=0.01, max_iter=10000),
    'Random Forest':     RandomForestRegressor(n_estimators=100, random_state=42),
    'SVR':               SVR(kernel='rbf'),
}

print('{:25s} {:>10} {:>10}'.format('Model', 'R² mean', 'R² std'))
print('-' * 50)
for name, model in models.items():
    scores = cross_val_score(model, X_train, y_train, cv=5, scoring='r2')
    print(f'{name:25s} {scores.mean():>10.4f} {scores.std():>10.4f}')`
      }
    ]
  },

  // ── METRICHE ──────────────────────────────────────────────────────────────
  metrics: {
    label: "Metriche",
    icon: "📊",
    items: [
      {
        title: "Metriche Classificazione — Base",
        tag: "classificazione", tagColor: "green",
        when: "Subito dopo predict — panoramica rapida delle performance",
        code: `from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score

acc  = accuracy_score(y_test, y_pred)
f1   = f1_score(y_test, y_pred, average='weighted')  # 'binary' se binario
prec = precision_score(y_test, y_pred, average='weighted')
rec  = recall_score(y_test, y_pred, average='weighted')

print(f'Accuracy:  {acc:.4f}')
print(f'F1-Score:  {f1:.4f}')
print(f'Precision: {prec:.4f}')
print(f'Recall:    {rec:.4f}')`
      },
      {
        title: "Classification Report completo",
        tag: "classificazione", tagColor: "green",
        when: "Per analisi dettagliata precision/recall/F1 per ogni classe",
        code: `from sklearn.metrics import classification_report

# TODO: definisci target_names se vuoi etichette leggibili
print(classification_report(
    y_test, y_pred,
    target_names=None  # TODO: es. ['Classe0', 'Classe1']
))`
      },
      {
        title: "Confusion Matrix con grafico",
        tag: "classificazione", tagColor: "green",
        when: "Per vedere quali classi vengono confuse tra loro",
        code: `from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay

cm = confusion_matrix(y_test, y_pred)
print('Confusion Matrix:')
print(cm)

fig, ax = plt.subplots(figsize=(6, 5))
disp = ConfusionMatrixDisplay(confusion_matrix=cm)
disp.plot(ax=ax, cmap='Blues', colorbar=False)
ax.set_title('Confusion Matrix')
plt.tight_layout()
plt.show()`
      },
      {
        title: "ROC Curve e AUC (binaria)",
        tag: "classificazione", tagColor: "green",
        when: "Solo classificazione binaria con probabilità (predict_proba)",
        code: `from sklearn.metrics import roc_curve, roc_auc_score

# y_prob = model.predict_proba(X_test)[:, 1]
fpr, tpr, thresholds = roc_curve(y_test, y_prob)
auc = roc_auc_score(y_test, y_prob)

plt.figure(figsize=(7, 5))
plt.plot(fpr, tpr, label=f'ROC Curve (AUC = {auc:.3f})')
plt.plot([0, 1], [0, 1], 'k--', label='Random')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve')
plt.legend()
plt.tight_layout()
plt.show()`
      },
      {
        title: "Metriche Regressione — Base",
        tag: "regressione", tagColor: "orange",
        when: "Subito dopo predict su un regressore — panoramica rapida",
        code: `from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import numpy as np

mse  = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
mae  = mean_absolute_error(y_test, y_pred)
r2   = r2_score(y_test, y_pred)

print(f'MSE:  {mse:.4f}')
print(f'RMSE: {rmse:.4f}')
print(f'MAE:  {mae:.4f}')
print(f'R²:   {r2:.4f}')

n = len(y_test)
p = X_test.shape[1]
r2_adj = 1 - (1 - r2) * (n - 1) / (n - p - 1)
print(f'R² adj: {r2_adj:.4f}')`
      },
      {
        title: "Cross-Validation score",
        tag: "validazione", tagColor: "blue",
        when: "Per stima affidabile delle performance — evita overfitting nella valutazione",
        code: `from sklearn.model_selection import cross_val_score, StratifiedKFold, KFold

# Per classificazione
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
# Per regressione usa: cv = KFold(n_splits=5, shuffle=True, random_state=42)

scores = cross_val_score(
    model, X_train, y_train,
    cv=cv,
    scoring='f1_weighted'  # TODO: 'accuracy', 'r2', 'neg_rmse', ecc.
)

print(f'CV Scores: {scores.round(4)}')
print(f'Mean: {scores.mean():.4f} ± {scores.std():.4f}')`
      }
    ]
  },

  // ── GRAFICI ───────────────────────────────────────────────────────────────
  plots: {
    label: "Grafici",
    icon: "🎨",
    items: [
      {
        title: "Heatmap correlazioni",
        tag: "grafico", tagColor: "purple",
        when: "EDA — per vedere quali feature sono correlate tra loro e col target",
        code: `import matplotlib.pyplot as plt
import seaborn as sns

corr = df.select_dtypes(include='number').corr()

plt.figure(figsize=(12, 8))
sns.heatmap(
    corr,
    annot=True,
    fmt='.2f',
    cmap='coolwarm',
    center=0,
    square=True,
    linewidths=0.5
)
plt.title('Correlation Heatmap')
plt.tight_layout()
plt.show()`
      },
      {
        title: "Distribuzione target",
        tag: "grafico", tagColor: "purple",
        when: "EDA — per verificare bilanciamento classi o skewness del target",
        code: `target = 'target'  # TODO

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

axes[0].hist(df[target], bins=30, color='steelblue', edgecolor='black', alpha=0.7)
axes[0].set_title(f'Distribuzione {target}')
axes[0].set_xlabel(target)
axes[0].set_ylabel('Frequenza')

axes[1].boxplot(df[target], vert=True, patch_artist=True,
                boxprops=dict(facecolor='steelblue', alpha=0.7))
axes[1].set_title(f'Boxplot {target}')

plt.tight_layout()
plt.show()`
      },
      {
        title: "Boxplot — feature numeriche",
        tag: "grafico", tagColor: "purple",
        when: "EDA — per vedere outlier e distribuzione di ogni feature",
        code: `import seaborn as sns
import matplotlib.pyplot as plt

num_cols = df.select_dtypes(include='number').columns.tolist()
n_cols   = 3
n_rows   = (len(num_cols) + n_cols - 1) // n_cols

fig, axes = plt.subplots(n_rows, n_cols, figsize=(14, 4 * n_rows))
axes = axes.flatten()

for i, col in enumerate(num_cols):
    sns.boxplot(y=df[col], ax=axes[i], color='steelblue')
    axes[i].set_title(col)

for j in range(i + 1, len(axes)):
    axes[j].set_visible(False)

plt.tight_layout()
plt.show()`
      },
      {
        title: "Pairplot (relazioni tra feature)",
        tag: "grafico", tagColor: "purple",
        when: "EDA — per vedere relazioni tra più feature insieme (max 5-6 colonne)",
        code: `import seaborn as sns

cols = ['col1', 'col2', 'col3', 'target']  # TODO

sns.pairplot(
    df[cols],
    hue='target',   # TODO: rimuovi se target è numerico
    diag_kind='kde',
    plot_kws={'alpha': 0.5}
)
plt.suptitle('Pairplot', y=1.02)
plt.show()`
      },
      {
        title: "Scatter — target reale vs predetto",
        tag: "grafico", tagColor: "purple",
        when: "Post-regressione — per valutare qualità delle predizioni visivamente",
        code: `import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(7, 6))

ax.scatter(y_test, y_pred, alpha=0.5, edgecolors='k', linewidths=0.3, s=40)

lims = [min(y_test.min(), y_pred.min()), max(y_test.max(), y_pred.max())]
ax.plot(lims, lims, 'r--', lw=2, label='Perfetto')

ax.set_xlabel('Valori reali')
ax.set_ylabel('Valori predetti')
ax.set_title(f'Reale vs Predetto  (R²={r2_score(y_test, y_pred):.3f})')
ax.legend()
plt.tight_layout()
plt.show()`
      },
      {
        title: "Residual plot (regressione)",
        tag: "grafico", tagColor: "purple",
        when: "Post-regressione — per verificare assunzioni del modello lineare",
        code: `import matplotlib.pyplot as plt
import numpy as np

residuals = y_test - y_pred

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

axes[0].scatter(y_pred, residuals, alpha=0.5, s=30)
axes[0].axhline(0, color='red', linestyle='--')
axes[0].set_xlabel('Valori predetti')
axes[0].set_ylabel('Residui')
axes[0].set_title('Residui vs Predetti')

axes[1].hist(residuals, bins=30, color='steelblue', edgecolor='black', alpha=0.7)
axes[1].set_xlabel('Residuo')
axes[1].set_title('Distribuzione Residui')

plt.tight_layout()
plt.show()`
      },
      {
        title: "Feature importance (barplot)",
        tag: "grafico", tagColor: "purple",
        when: "Post-fit alberi — per capire quali feature contano di più",
        code: `import matplotlib.pyplot as plt
import pandas as pd

feat_imp = pd.Series(
    model.feature_importances_,
    index=X_train.columns
).sort_values(ascending=True).tail(15)

fig, ax = plt.subplots(figsize=(8, 6))
feat_imp.plot(kind='barh', ax=ax, color='steelblue')
ax.set_title('Feature Importance (Top 15)')
ax.set_xlabel('Importance')
plt.tight_layout()
plt.show()`
      }
    ]
  },

  // ── CLUSTERING ────────────────────────────────────────────────────────────
  clustering: {
    label: "Clustering",
    icon: "🔵",
    items: [
      {
        title: "Import Clustering",
        tag: "import", tagColor: "gray",
        when: "Quando il dataset non ha etichette (unsupervised learning)",
        code: `from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering
from sklearn.metrics import silhouette_score, davies_bouldin_score
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import numpy as np

# Il clustering non usa il target (unsupervised)
# Ricorda: scala sempre i dati prima del clustering`
      },
      {
        title: "KMeans + Elbow Method",
        tag: "KMeans", tagColor: "gray",
        when: "Per trovare k gruppi naturali nei dati — scegli k con il gomito del grafico",
        code: `from sklearn.cluster import KMeans

# Scala SEMPRE prima del clustering
scaler   = StandardScaler()
X_scaled = scaler.fit_transform(X)  # TODO: X = DataFrame senza colonna target

# Elbow method — trova k ottimale
inertia = []
k_range = range(2, 11)
for k in k_range:
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X_scaled)
    inertia.append(km.inertia_)

plt.figure(figsize=(7, 4))
plt.plot(k_range, inertia, 'bo-')
plt.xlabel('Numero di cluster (k)')
plt.ylabel('Inertia (WCSS)')
plt.title('Elbow Method — scegli il k dove la curva piega')
plt.xticks(k_range)
plt.tight_layout()
plt.show()

# TODO: scegli k osservando il gomito
k_best   = 3  # TODO
km_final = KMeans(n_clusters=k_best, random_state=42, n_init=10)
labels   = km_final.fit_predict(X_scaled)

print(f'Distribuzione cluster:')
print(pd.Series(labels).value_counts().sort_index())`
      },
      {
        title: "DBSCAN",
        tag: "DBSCAN", tagColor: "gray",
        when: "Per cluster di forma arbitraria e gestione automatica del rumore (-1)",
        code: `from sklearn.cluster import DBSCAN

scaler   = StandardScaler()
X_scaled = scaler.fit_transform(X)  # TODO

dbscan = DBSCAN(
    eps=0.5,       # TODO: raggio intorno a ogni punto (prova 0.3, 0.5, 1.0)
    min_samples=5  # TODO: min punti per formare un cluster
)
labels = dbscan.fit_predict(X_scaled)

n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
n_noise    = (labels == -1).sum()

print(f'Cluster trovati: {n_clusters}')
print(f'Punti rumore (label=-1): {n_noise} ({n_noise/len(labels)*100:.1f}%)')
print(pd.Series(labels).value_counts().sort_index())`
      },
      {
        title: "Silhouette Score",
        tag: "valutazione", tagColor: "gray",
        when: "Per valutare la qualità dei cluster senza ground truth",
        code: `from sklearn.metrics import silhouette_score, davies_bouldin_score

# labels = output di fit_predict del modello clustering
score_sil = silhouette_score(X_scaled, labels)
score_db  = davies_bouldin_score(X_scaled, labels)

print(f'Silhouette Score: {score_sil:.4f}')
print(f'  da -1 (pessimo) a +1 (ottimo), >0.5 buono')
print(f'Davies-Bouldin:   {score_db:.4f}  (più basso = meglio)')

# Confronto silhouette per diversi k
k_scores = []
for k in range(2, 11):
    km  = KMeans(n_clusters=k, random_state=42, n_init=10)
    lbl = km.fit_predict(X_scaled)
    k_scores.append(silhouette_score(X_scaled, lbl))

best_k = range(2, 11)[k_scores.index(max(k_scores))]
print(f'\\nMiglior k (silhouette): {best_k} → {max(k_scores):.4f}')`
      }
    ]
  },

  // ── ERRORI COMUNI ─────────────────────────────────────────────────────────
  errors: {
    label: "Errori comuni",
    icon: "⚠️",
    items: [
      {
        title: "ValueError: could not convert string to float",
        tag: "encoding", tagColor: "red",
        when: "Quando sklearn lancia ValueError su colonne object",
        cause: "Colonne categoriche (dtype object) passate al modello senza encoding",
        code: `# Diagnosi — vedi quali colonne sono ancora stringhe
print(X_train.dtypes[X_train.dtypes == 'object'])

# SOLUZIONE 1: pd.get_dummies (rapido)
X_train = pd.get_dummies(X_train, drop_first=True)
X_test  = pd.get_dummies(X_test,  drop_first=True)
X_test  = X_test.reindex(columns=X_train.columns, fill_value=0)

# SOLUZIONE 2: LabelEncoder per ogni colonna categorica
from sklearn.preprocessing import LabelEncoder
for col in X_train.select_dtypes(include='object').columns:
    le = LabelEncoder()
    X_train[col] = le.fit_transform(X_train[col].astype(str))
    X_test[col]  = le.transform(X_test[col].astype(str))`
      },
      {
        title: "ValueError: Input contains NaN",
        tag: "imputer", tagColor: "red",
        when: "Quando sklearn lancia ValueError per valori nulli nelle feature",
        cause: "Valori NaN presenti in X_train o X_test — sklearn li rifiuta",
        code: `# Diagnosi
print(X_train.isnull().sum()[X_train.isnull().sum() > 0])

# SOLUZIONE: SimpleImputer separato per numeriche e categoriche
from sklearn.impute import SimpleImputer

num_cols = X_train.select_dtypes(include='number').columns
cat_cols = X_train.select_dtypes(include='object').columns

imp_num = SimpleImputer(strategy='median')
imp_cat = SimpleImputer(strategy='most_frequent')

X_train[num_cols] = imp_num.fit_transform(X_train[num_cols])
X_test[num_cols]  = imp_num.transform(X_test[num_cols])

if len(cat_cols) > 0:
    X_train[cat_cols] = imp_cat.fit_transform(X_train[cat_cols])
    X_test[cat_cols]  = imp_cat.transform(X_test[cat_cols])

print('NaN rimasti:', X_train.isnull().sum().sum())`
      },
      {
        title: "Shape mismatch tra X_train e X_test",
        tag: "encoding", tagColor: "red",
        when: "Quando train e test hanno numero diverso di colonne dopo get_dummies",
        cause: "get_dummies crea colonne diverse se train e test hanno categorie diverse",
        code: `# Diagnosi
print('Colonne train:', X_train.shape[1])
print('Colonne test: ', X_test.shape[1])
extra_train = set(X_train.columns) - set(X_test.columns)
extra_test  = set(X_test.columns)  - set(X_train.columns)
print(f'Solo in train: {extra_train}')
print(f'Solo in test:  {extra_test}')

# SOLUZIONE: reindex X_test sulle colonne di X_train
X_test = X_test.reindex(columns=X_train.columns, fill_value=0)
print(f'Shape allineate — train: {X_train.shape}, test: {X_test.shape}')`
      },
      {
        title: "ConvergenceWarning — LogisticRegression",
        tag: "convergenza", tagColor: "red",
        when: "Quando LogisticRegression non converge entro max_iter iterazioni",
        cause: "Il solver non trova il minimo entro il numero di iterazioni default (100)",
        code: `# SOLUZIONE 1: aumenta max_iter
from sklearn.linear_model import LogisticRegression
lr = LogisticRegression(max_iter=1000, random_state=42)  # default=100

# SOLUZIONE 2: cambia solver
lr = LogisticRegression(solver='saga', max_iter=1000, random_state=42)
# solver='lbfgs' (default), 'saga', 'liblinear', 'newton-cg'

# SOLUZIONE 3: scala i dati — spesso risolve il problema
from sklearn.preprocessing import StandardScaler
scaler    = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)
lr = LogisticRegression(max_iter=500, random_state=42)
lr.fit(X_train_s, y_train)`
      },
      {
        title: "Data leakage — fit su train, transform su entrambi",
        tag: "leakage", tagColor: "red",
        when: "Regola fondamentale — da leggere prima di ogni preprocessing",
        cause: "Fare fit su tutto X include info del test nel preprocessore (data leakage)",
        code: `# SBAGLIATO — fit su tutto X (data leakage)
scaler.fit(X)
X_train_s = scaler.transform(X_train)
X_test_s  = scaler.transform(X_test)

# CORRETTO — fit solo su X_train, transform su entrambi
scaler    = StandardScaler()
X_train_s = scaler.fit_transform(X_train)  # fit + transform
X_test_s  = scaler.transform(X_test)       # solo transform!

# REGOLA per tutti i preprocessori sklearn:
#   .fit_transform(X_train)  → solo su train
#   .transform(X_test)       → su test (e validation)
# Vale per: StandardScaler, MinMaxScaler, SimpleImputer,
#           LabelEncoder, OneHotEncoder, SelectKBest, PCA`
      },
      {
        title: "TypeError: sparse_output vs sparse",
        tag: "sklearn", tagColor: "red",
        when: "Con sklearn <1.2 o quando cambi versione di sklearn",
        cause: "sklearn >=1.2 rinomina sparse=False in sparse_output=False",
        code: `import sklearn
print('sklearn version:', sklearn.__version__)

# sklearn < 1.2: usa sparse=False
# sklearn >= 1.2: usa sparse_output=False  (sparse è deprecato)

# SOLUZIONE compatibile con entrambe le versioni
try:
    ohe = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
except TypeError:
    ohe = OneHotEncoder(sparse=False, handle_unknown='ignore')

# ALTERNATIVA: usa .toarray() senza il parametro
from sklearn.preprocessing import OneHotEncoder
ohe = OneHotEncoder(handle_unknown='ignore')
enc_train = ohe.fit_transform(X_train[cat_cols]).toarray()
enc_test  = ohe.transform(X_test[cat_cols]).toarray()`
      }
    ]
  }
};
