/*get alternatives of a lit (littera >> set)*/
SELECT DISTINCT char FROM laeme.litterae WHERE morphid||'-'||pos IN
(SELECT morphid||'-'||pos FROM laeme.litterae WHERE char='ch')



/*GET lexels based on set*/
SELECT  char,pos, lexel, array_agg (DISTINCT form) FROM laeme.litterae l
INNER JOIN laeme.morpheme_index mi ON mi.id=l.morphid
INNER JOIN laeme.form_index fi ON l.formid=fi.id
WHERE l.morphid||'-'||pos IN
(SELECT morphid||'-'||pos FROM laeme.litterae WHERE char IN ('h','ch','s'))
GROUP BY char,pos, lexel
ORDER BY char, lexel